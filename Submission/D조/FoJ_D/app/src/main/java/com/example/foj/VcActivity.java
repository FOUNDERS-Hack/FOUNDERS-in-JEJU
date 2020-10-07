package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import org.bouncycastle.util.encoders.Hex;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import foundation.icon.did.Credential;
import foundation.icon.did.core.Algorithm;
import foundation.icon.did.core.AlgorithmProvider;
import foundation.icon.did.core.DidKeyHolder;
import foundation.icon.did.core.KeyProvider;
import foundation.icon.did.document.Document;
import foundation.icon.did.document.EncodeType;
import foundation.icon.did.document.PublicKeyProperty;
import foundation.icon.did.exceptions.AlgorithmException;
import foundation.icon.did.jwt.Jwt;
import foundation.icon.did.protocol.ClaimRequest;
import foundation.icon.icx.Call;
import foundation.icon.icx.IconService;
import foundation.icon.icx.data.Address;
import foundation.icon.icx.transport.http.HttpProvider;
import foundation.icon.icx.transport.jsonrpc.RpcItem;
import foundation.icon.icx.transport.jsonrpc.RpcObject;
import foundation.icon.icx.transport.jsonrpc.RpcValue;


public class VcActivity extends Activity {
    /* seungho */
    Button btnName, btnAddress, btnLicence, btnReport, btnEmail, btnIcxAddress;
    String name, address, licence, report, email, icxAddress;
    /* seungho */
    ImageView btnVC;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.vc);

        /* seungho */
        btnName = findViewById(R.id.name);
        btnAddress = findViewById(R.id.address);
        btnLicence = findViewById(R.id.licenceNumber);
        btnReport = findViewById(R.id.report);
        btnEmail = findViewById(R.id.email);
//        btnIcxAddress = findViewById(R.id.icxAddress);
        /* seungho */

        btnVC = findViewById(R.id.btnVC);
        btnVC.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){

                /* seungho */
                try {

                    name = (String) btnName.getText();
                    String nameVC = new issueVC("name", name).execute().get();

                    address = (String) btnAddress.getText();
                    String addressVC = new issueVC("address", address).execute().get();

                    licence = (String) btnLicence.getText();
                    String licenceVC = new issueVC("licence", licence).execute().get();

                    report = (String) btnReport.getText();
                    String reportVC = new issueVC("report", report).execute().get();

                    email = (String) btnEmail.getText();
                    String emailVC = new issueVC("email", email).execute().get();

//                    icxAddress = (String) btnIcxAddress.getText();
//                    String icxAddressVC = new issueVC("icxAddress", icxAddress).execute().get();

                    Intent intent = new Intent(VcActivity.this,myVC.class);
                    intent.putExtra("nameVC", nameVC);
                    intent.putExtra("addressVC", addressVC);
                    intent.putExtra("licenceVC", licenceVC);
                    intent.putExtra("reportVC", reportVC);
                    intent.putExtra("emailVC", emailVC);
//                    intent.putExtra("icxAddressVC", icxAddressVC);
                    startActivity(intent);
                    /* seungho */
                    finish();
                    /* seungho */

                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                /* seungho */
            }
        });

    }

    /* seungho */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(getApplicationContext(), profileActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */

    /* seungho */
    class issueVC extends AsyncTask<Void, Void, String> {

        HttpProvider httpProvider = new HttpProvider("https://bicon.net.solidwallet.io/api/v3");
        IconService iconService = new IconService(httpProvider);
        Address scoreAddress = new Address("cx50a19105be5c2463f4d89c5e0d35f105db5c8561");
        Algorithm algorithm = AlgorithmProvider.create(AlgorithmProvider.Type.ES256K);
        EncodeType encodeType = EncodeType.BASE64;

        String claimType, claimInfo;

        issueVC(String claimType, String claimInfo) {
            this.claimType = claimType;
            this. claimInfo = claimInfo;
        }

        @Override
        protected String doInBackground(Void... voids) {

            try {
                String issuerDid = "did:icon:03:0x123456789";

                String holderDid = "did:icon:03:0x987654321";
                String holderKeyId = "Holder-key";
                KeyProvider holderKeyProvider = algorithm.generateKeyProvider(holderKeyId);
                DidKeyHolder holderKeyHolder = new DidKeyHolder.Builder(holderKeyProvider)
                        .did(holderDid)
                        .build();
                List<String> requestClaimTypes = Arrays.asList(this.claimType);
                List<String> requestClaimValues = Arrays.asList(this.claimInfo);
                Map claims = new HashMap();
                for (int i = 0; i < requestClaimTypes.size(); i++) {
                    claims.put(requestClaimTypes.get(i), requestClaimValues.get(i));
                }
                String nonce = Hex.toHexString(AlgorithmProvider.secureRandom().generateSeed(4));

                ClaimRequest request = new ClaimRequest.Builder(ClaimRequest.Type.CREDENTIAL)
                        .didKeyHolder(holderKeyHolder)
                        .requestClaims(claims)
                        .responseId(issuerDid)
                        .nonce(nonce)
                        .build();

                String requestJwt = holderKeyHolder.sign(request.getJwt());
                Log.i("### requestJwt", requestJwt);


                ClaimRequest claimRequest = ClaimRequest.valueOf(requestJwt);
                holderDid = claimRequest.getRequestId();
                holderKeyId = "Holder-key";
                Document holderDocument = readDocument(holderDid, holderKeyId);

                PublicKeyProperty publicKeyProperty = holderDocument.getPublicKeyProperty(claimRequest.getKeyId());
                PublicKey publicKey = publicKeyProperty.getPublicKey();
                Jwt.VerifyResult result = claimRequest.verify(publicKey);

                if (!result.isSuccess()) {
                    Log.i("### Authentication fail", result.getFailMessage());
                }

                List<String> claimTypes = claimRequest.getClaimTypes();
                Map claimMap = new HashMap();
                claimMap.put(claimTypes.get(0), this.claimInfo);

                issuerDid = "did:icon:03:0x123456789";
                String issuerKeyId = "Issuer-key";
                holderKeyProvider = algorithm.generateKeyProvider(issuerKeyId);
                DidKeyHolder issuerKeyHolder = new DidKeyHolder.Builder(holderKeyProvider)
                        .did(issuerDid)
                        .build();
                Credential credential = new Credential.Builder()
                        .didKeyHolder(issuerKeyHolder)
                        .nonce(claimRequest.getNonce())
                        .build();
                credential.setTargetDid(holderDid);
                credential.setClaim(claimMap);

                Date issued = new Date();
                long duration = credential.getDuration() * 1000L;
                Date expiration = new Date(issued.getTime() + duration);

                String signedCredential = issuerKeyHolder.sign(credential.buildJwt(issued, expiration));
                Log.i("### signedCredential", signedCredential);

                return signedCredential;

            } catch (AlgorithmException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;

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
