package com.example.foj;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import foundation.icon.did.core.Algorithm;
import foundation.icon.did.core.AlgorithmProvider;
import foundation.icon.did.core.KeyProvider;
import foundation.icon.did.document.Document;
import foundation.icon.did.document.EncodeType;
import foundation.icon.did.document.PublicKeyProperty;
import foundation.icon.did.exceptions.AlgorithmException;
import foundation.icon.did.exceptions.TransactionException;
import foundation.icon.did.score.ScoreParameter;
import foundation.icon.icx.Call;
import foundation.icon.icx.IconService;
import foundation.icon.icx.KeyWallet;
import foundation.icon.icx.SignedTransaction;
import foundation.icon.icx.Transaction;
import foundation.icon.icx.TransactionBuilder;
import foundation.icon.icx.data.Address;
import foundation.icon.icx.data.Bytes;
import foundation.icon.icx.data.TransactionResult;
import foundation.icon.icx.transport.http.HttpProvider;
import foundation.icon.icx.transport.jsonrpc.RpcError;
import foundation.icon.icx.transport.jsonrpc.RpcItem;
import foundation.icon.icx.transport.jsonrpc.RpcObject;
import foundation.icon.icx.transport.jsonrpc.RpcValue;

public class RegDid extends AppCompatActivity {
    /* seungho */
    Document document;
    EditText dids;
    /* seungho */
    Button done;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sev_did);

        /* seungho */
        dids = findViewById(R.id.username);
        /* seungho */
        done = findViewById(R.id.done);

        /* seungho */
        try {
            document = new RegisterDid().execute().get();
            dids.setText(document.getId());
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        /* seungho */

        done.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (RegDid.this, Main.class);
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
        Intent intent = new Intent(getApplicationContext(), IcxSelActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */

    /* seungho */
    class RegisterDid extends AsyncTask<Void, Void, Document> {

        HttpProvider httpProvider = new HttpProvider("https://bicon.net.solidwallet.io/api/v3");
        IconService iconService = new IconService(httpProvider);
        BigInteger networkId = new BigInteger("3");
        Address scoreAddress = new Address("cx50a19105be5c2463f4d89c5e0d35f105db5c8561");
        Algorithm algorithm = AlgorithmProvider.create(AlgorithmProvider.Type.ES256K);
        EncodeType encodeType = EncodeType.BASE64;

        @Override
        protected Document doInBackground(Void... voids) {

            try {

                Document document = null;
                for(int i = 1; i < 2; i++) {

                    KeyWallet wallet = null;
                    String id = null, keyId = null, param = null;
                    if (i == 0) {
                        wallet = KeyWallet.load(new Bytes("f37a3ce1d2d5d5213ef6fd471066d3844675697807bb57a2b4948cd848c06c63"));
                        id = "0x123456789";
                        keyId = "Issuer-key";
                        KeyProvider keyProvider = algorithm.generateKeyProvider(keyId);
                        param = ScoreParameter.create(keyProvider, encodeType);
                    }
                    else {
                        wallet = KeyWallet.load(new Bytes("b7a7f8c25301cd4a630fdb4f9b61c0d879ca7d6b9e67059a65fc2ccb1c0c2d8c"));
                        id = "0x987654321";
                        keyId = "Holder-key";
                        KeyProvider keyProvider = algorithm.generateKeyProvider(keyId);
                        param = ScoreParameter.create(keyProvider, encodeType);
                    }

                    RpcObject paramsCreate = new RpcObject.Builder()
                            .put("id", new RpcValue(id))
                            .put("publicKey", new RpcValue(param))
                            .build();
                    Transaction transaction = TransactionBuilder.newBuilder()
                            .nid(networkId)
                            .from(wallet.getAddress())
                            .to(scoreAddress)
                            .stepLimit(new BigInteger("1000000"))
                            .timestamp(new BigInteger(Long.toString(System.currentTimeMillis() * 1000L)))
                            .call("create")
                            .params(paramsCreate)
                            .build();
                    SignedTransaction signedTransaction = new SignedTransaction(transaction, wallet);
                    Bytes txHash = iconService.sendTransaction(signedTransaction).execute();
                    TransactionResult txResult = this.getTransactionResult(txHash);
                    String did = this.getDid(txResult.getEventLogs(), "Create(Address,str,str)");

                    document = readDocument(did, keyId);
                    Log.i("### document " + i, document.toString());

                }
                return document;

            } catch (IOException | AlgorithmException | ParseException e) {
                e.printStackTrace();
            }
            return null;

        }

        TransactionResult getTransactionResult(Bytes hash) throws IOException {
            try {
                ExecutorService executor = Executors.newCachedThreadPool();
                return (TransactionResult)executor.submit(() -> {

                    TransactionResult result = null;
                    while(result == null) {
                        try {
                            Thread.sleep(1000L);
                            result = (TransactionResult)iconService.getTransactionResult(hash).execute();
                            if (result.getStatus().equals(BigInteger.ZERO)) {
                                throw new TransactionException(result);
                            }
                        } catch (RpcError var4) {
                        } catch (InterruptedException var5) {
                            Thread.currentThread().interrupt();
                        }
                    }
                    return result;

                }).get(15000L, TimeUnit.MILLISECONDS);
            } catch (TimeoutException var3) {
                throw new TransactionException("timeout");
            } catch (Exception var4) {
                throw new TransactionException(var4.getMessage());
            }
        }

        String getDid(List<TransactionResult.EventLog> eventLogs, String eventName) {
            Iterator var3 = eventLogs.iterator();

            List items;
            String func;
            do {
                if (!var3.hasNext()) {
                    return null;
                }

                TransactionResult.EventLog log = (TransactionResult.EventLog)var3.next();
                items = log.getIndexed();
                func = ((RpcItem)items.get(0)).asString();
            } while(!func.equals(eventName));

            return ((RpcItem)items.get(2)).asString();
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
