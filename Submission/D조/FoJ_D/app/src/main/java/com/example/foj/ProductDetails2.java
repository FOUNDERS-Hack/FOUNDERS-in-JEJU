package com.example.foj;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.security.PublicKey;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;

import foundation.icon.did.Credential;
import foundation.icon.did.Presentation;
import foundation.icon.did.core.Algorithm;
import foundation.icon.did.core.AlgorithmProvider;
import foundation.icon.did.core.KeyProvider;
import foundation.icon.did.document.Document;
import foundation.icon.did.document.EncodeType;
import foundation.icon.did.document.PublicKeyProperty;
import foundation.icon.did.exceptions.AlgorithmException;
import foundation.icon.did.jwt.Jwt;
import foundation.icon.did.jwt.Payload;
import foundation.icon.icx.Call;
import foundation.icon.icx.IconService;
import foundation.icon.icx.data.Address;
import foundation.icon.icx.transport.http.HttpProvider;
import foundation.icon.icx.transport.jsonrpc.RpcItem;
import foundation.icon.icx.transport.jsonrpc.RpcObject;
import foundation.icon.icx.transport.jsonrpc.RpcValue;

public class ProductDetails2 extends Activity {
    /* seungho */
    Button btnsave;
    String presentation;
    ArrayList<String> items;
    DatabaseReference mPostReference;
    /* seungho */
    ImageView btnbuy0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.productdetails2);

        /* seungho */
        items = new ArrayList<>();
        mPostReference = FirebaseDatabase.getInstance().getReference().child("did:icon:03:0x987654321").child("VP");
        mPostReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                items.clear();
                for(DataSnapshot postSnapshot : dataSnapshot.getChildren()) {
                    String item = (String) postSnapshot.getValue();
                    items.add(item);
                }
                presentation = items.get(0);
            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {}
        });

        btnsave = findViewById(R.id.btnsave);
        btnsave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    Boolean result = new VerifyVP(presentation).execute().get();
                    if (result == Boolean.TRUE) {
                        Toast.makeText(getApplicationContext(), "신뢰할 수 있는 판매자입니다.", Toast.LENGTH_SHORT).show();
                    }
                    else {
                        Toast.makeText(getApplicationContext(), "검증에 실패했습니다.", Toast.LENGTH_SHORT).show();
                    }
                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        /* seungho */

        btnbuy0 = findViewById(R.id.btnbuy0);
        btnbuy0.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ProductDetails2.this, Buying2.class);
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
        Intent intent = new Intent(getApplicationContext(), ProductList2.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */

    /* seungho */
    class VerifyVP extends AsyncTask<Void, Void, Boolean> {

        HttpProvider httpProvider = new HttpProvider("https://bicon.net.solidwallet.io/api/v3");
        IconService iconService = new IconService(httpProvider);
        Address scoreAddress = new Address("cx50a19105be5c2463f4d89c5e0d35f105db5c8561");
        Algorithm algorithm = AlgorithmProvider.create(AlgorithmProvider.Type.ES256K);
        EncodeType encodeType = EncodeType.BASE64;
        String VP;

        VerifyVP(String VP) {
            this.VP = VP;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {

            try {
                Presentation presentation = Presentation.valueOf(VP);
                String holderDid = presentation.getDid();
                String holderKeyId = "Holder-key";
                Document holderDocument = readDocument(holderDid, holderKeyId);

                PublicKeyProperty publicKeyProperty = holderDocument.getPublicKeyProperty(presentation.getKeyId());
                PublicKey publicKey = publicKeyProperty.getPublicKey();
                Jwt.VerifyResult resultVP = Jwt.decode(VP).verify(publicKey);
                Log.i("### resultVP", resultVP.toString());

                List<String> claims = presentation.getCredentials();
                for (String s : claims) {

                    Payload payload = Jwt.decode(s).getPayload();
                    Credential credential = Credential.valueOf(s);
                    String issuerDid = credential.getDid();
                    String issuerKeyId = "Issuer-key";
                    Document issuerDocument = readDocument(issuerDid, issuerKeyId);

                    publicKeyProperty = issuerDocument.getPublicKeyProperty(credential.getKeyId());
                    publicKey = publicKeyProperty.getPublicKey();
                    Jwt.VerifyResult resultVC = Jwt.decode(s).verify(publicKey);

                    boolean checkTarget = holderDid.equals(credential.getTargetDid());
                    if (!checkTarget) {
                        Log.i("### checkTarget", "The owner's did and the issuer's target did differ");
                    }

                    if (!resultVC.isSuccess()) {
                        Log.i("### resultVC: failed", resultVC.getFailMessage());
                    }

                    return Boolean.TRUE;
                }

            } catch (IOException | ParseException | AlgorithmException e) {
                e.printStackTrace();
            }

            return Boolean.FALSE;
        }

        Document readDocument(String did, String keyId) throws IOException, ParseException, AlgorithmException {

            RpcObject paramsRead = new RpcObject.Builder()
                    .put("did", new RpcValue(did))
                    .build();
            Call<RpcItem> call = new Call.Builder()
                    .to(scoreAddress)
                    .method("read")
                    .params(paramsRead)
                    .build();
            RpcItem callResult = iconService.call(call).execute();
            JSONObject jsonObj = (JSONObject)new JSONParser().parse(callResult.toString());

            KeyProvider keyProvider = algorithm.generateKeyProvider(keyId);
            PublicKeyProperty publicKeyPropertyToMap = new foundation.icon.did.document.PublicKeyProperty.Builder()
                    .id(keyProvider.getKeyId())
                    .type(Collections.singletonList(keyProvider.getType().getIdentifier()))
                    .publicKey(keyProvider.getPublicKey())
                    .encodeType(encodeType)
                    .build();
            HashMap<String, PublicKeyProperty> hashMap = new HashMap<>();
            hashMap.put(keyId, publicKeyPropertyToMap);

            Document document = new Document.Builder()
                    .version("1")
                    .id(jsonObj.get("id").toString())
                    .created(Long.valueOf(jsonObj.get("created").toString()))
                    .updated(Long.valueOf(jsonObj.get("updated").toString()))
                    .publicKey(hashMap)
                    .build();
            return document;
        }

    }
    /* seungho */
}




