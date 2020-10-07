package com.example.foj;


import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;


import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.bouncycastle.util.encoders.Hex;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import foundation.icon.did.Presentation;
import foundation.icon.did.core.Algorithm;
import foundation.icon.did.core.AlgorithmProvider;
import foundation.icon.did.core.DidKeyHolder;
import foundation.icon.did.core.KeyProvider;
import foundation.icon.did.exceptions.AlgorithmException;
import foundation.icon.did.protocol.ClaimRequest;

public class vctoVP extends AppCompatActivity {
    Button btnVP;
    /* seungho */
    String VP;
    ArrayList<String> items;
    DatabaseReference mPostReference;
    /* seungho */

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.vctovp);

        /* seungho */
        items = new ArrayList<>();
        mPostReference = FirebaseDatabase.getInstance().getReference().child("did:icon:03:0x987654321").child("VC");
        mPostReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                items.clear();
                for(DataSnapshot postSnapshot : dataSnapshot.getChildren()) {
                    String item = (String) postSnapshot.getValue();
                    items.add(item);
                }

                try {
                    VP = new issueVP(items).execute().get();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {}
        });
        /* seungho */

        btnVP = (Button) findViewById(R.id.btnVP);
        btnVP.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                /* seungho */
                if (VP == null) {
                    Toast.makeText(getApplicationContext(), "Just wait a moment please", Toast.LENGTH_SHORT).show();
                }
                else {
                    Map<String, Object> childUpdates = new HashMap<>();
                    childUpdates.put("VP", VP);

                    mPostReference = FirebaseDatabase.getInstance().getReference().child("did:icon:03:0x987654321").child("VP");
                    mPostReference.updateChildren(childUpdates);

                    Toast.makeText(getApplicationContext(), "성공적으로 등록되었습니다.", Toast.LENGTH_SHORT).show();
                    onBackPressed();
                }
                /* seungho */

            }
        });

        final ArrayAdapter adapter = (new ArrayAdapter(this,android.R.layout.simple_list_item_multiple_choice,subject_select));

        final ListView listview = (ListView)findViewById(R.id.LV1);
        listview.setAdapter(adapter);
    }
    // adapter 데이터와 리스트뷰 연결하여 그 폼에 맞게 나타내주는 역할
    // 디자인 적용 - R.layout.simple_list_item가 리스트뷰의 커스텀 디자인이 됨
    // 이 어댑터를 리스트뷰에 적용

    //String 배열 저장해야 하므로 ArrayAdapter 사용 - ArrayAdapter(Context context, int resource, T[] objects)
    // context - 어플리케이션 전역 환경 정보에 대한 Interface // 여기서는 this
    // resource - view로 매핑될 리소스 id / textview 위젯으로 구성된 ListView 아이템 리소스 id
    // objects - 배열로 선언된 사용자 데이터
    final String[] subject_select = {"농가명","농가 주소","사업자번호","농가 이메일","생산보고서",/*"농가 ICX 계좌",*/"상세 설명"};

    /* seungho */
    class issueVP extends AsyncTask<Void, Void, String> {

        Algorithm algorithm = AlgorithmProvider.create(AlgorithmProvider.Type.ES256K);
        ArrayList<String> VCs;

        issueVP(ArrayList<String> VCs) {
            this.VCs = VCs;
        }

        @Override
        protected String doInBackground(Void... voids) {

            try {

                String holderDid = "did:icon:03:0x987654321";
                Date requestDate = new Date();
                List<String> claimTypes = Arrays.asList("email");
                String nonce = Hex.toHexString(AlgorithmProvider.secureRandom().generateSeed(4));

                ClaimRequest request = new ClaimRequest.Builder(ClaimRequest.Type.PRESENTATION)
                        .algorithm(AlgorithmProvider.Type.NONE)
                        .responseId(holderDid)
                        .requestDate(requestDate)
                        .requestClaimTypes(claimTypes)
                        .nonce(nonce)
                        .build();
                String unsignedJwt = request.compact();

                request = ClaimRequest.valueOf(unsignedJwt);

                holderDid = "did:icon:03:0x987654321";
                String holderKeyId = "Holder-key";
                KeyProvider holderKeyProvider = algorithm.generateKeyProvider(holderKeyId);
                DidKeyHolder holderKeyHolder = new DidKeyHolder.Builder(holderKeyProvider)
                        .did(holderDid)
                        .build();
                Presentation presentation = new Presentation.Builder()
                        .didKeyHolder(holderKeyHolder)
                        .nonce(request.getNonce())
                        .build();
                for (int i = 0; i < VCs.size(); i++) {
                    presentation.addCredential(VCs.get(i));
                }

                String signedPresentation = holderKeyHolder.sign(presentation.buildJwt());
                return signedPresentation;

            } catch (AlgorithmException e) {
                e.printStackTrace();
            }

            return null;
        }
    }
    /* seungho */
}
