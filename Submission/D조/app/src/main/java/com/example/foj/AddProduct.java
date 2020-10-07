package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

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


public class AddProduct extends Activity {
    /* seungho */
    ImageView ivRegister;
    TextView tvResult;
    String VP;
    ArrayList<String> items;
    DatabaseReference mPostReference;
    /* seungho */
    ImageView btnAdd;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.addproduct);

        /* seungho */
        ivRegister = findViewById(R.id.ivRegister);
        tvResult = findViewById(R.id.tvResult);

        ivRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (AddProduct.this,vctoVP.class);
                startActivity(intent);
                // finish() X
            }
        });
        /* seungho */

        btnAdd = findViewById(R.id.btnAdd);
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (AddProduct.this,ProductList2.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });


    }

    /* seungho */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(getApplicationContext(), ProductList1.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */

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