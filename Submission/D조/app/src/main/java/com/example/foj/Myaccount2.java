package com.example.foj;
import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;

import foundation.icon.icx.Call;
import foundation.icon.icx.IconService;
import foundation.icon.icx.KeyWallet;
import foundation.icon.icx.data.Bytes;
import foundation.icon.icx.transport.http.HttpProvider;
import foundation.icon.icx.transport.jsonrpc.RpcItem;
import foundation.icon.icx.transport.jsonrpc.RpcObject;
import foundation.icon.icx.transport.jsonrpc.RpcValue;

import static java.lang.Math.pow;

public class Myaccount2 extends Activity {

    /* seungho */
    TextView tvBalance;
    /* seungho */
    ImageView btnprfl, btnprdct, btnordr, btnpymnt;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.myaccount2);

        /* seungho */
        tvBalance = findViewById(R.id.balance);
        /* seungho */

        btnprfl = findViewById(R.id.btnprfl);
        btnprdct = findViewById(R.id.btnprdct);
        btnordr = findViewById(R.id.btnordr);
        btnpymnt = findViewById(R.id.btnpymnt);

        btnprfl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Myaccount2.this, profileActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
        btnprdct.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Myaccount2.this, ProductList1.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
        btnordr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Myaccount2.this, OrderList.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
        btnpymnt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Myaccount2.this, Wallet.class);
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
        Intent intent = new Intent(getApplicationContext(), Main.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
