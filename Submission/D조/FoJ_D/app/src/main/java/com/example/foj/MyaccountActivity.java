package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.concurrent.ExecutionException;

import foundation.icon.icx.IconService;
import foundation.icon.icx.KeyWallet;
import foundation.icon.icx.data.Bytes;
import foundation.icon.icx.transport.http.HttpProvider;

import static java.lang.Math.pow;


public class MyaccountActivity extends Activity {
    /* seungho */
    TextView tvbalance;
    /* seungho */
    ImageView btnprfl, btnprdct, btnordr, btnpymnt;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.myaccount);

        /* seungho */
        tvbalance=findViewById(R.id.balance);
        /* seungho */

        btnprfl = findViewById(R.id.btnprfl);
        btnprdct = findViewById(R.id.btnprdct);
        btnordr = findViewById(R.id.btnordr);
        btnpymnt = findViewById(R.id.btnpymnt);

        /* seungho */
        try {
            String balance = new getBalance().execute().get();
            tvbalance.setText("ICX " + balance);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        /* seungho */


        btnprfl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (MyaccountActivity.this,profileActivity.class);
                startActivity(intent);
            }
        });
        btnprdct.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (MyaccountActivity.this, ProductList1.class);
                startActivity(intent);
            }
        });
        btnordr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (MyaccountActivity.this,OrderList.class);
                startActivity(intent);
            }
        });
        btnpymnt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (MyaccountActivity.this,LoginActivity.class);
                startActivity(intent);
            }
        });

    }
    /* seungho */
    class getBalance extends AsyncTask<Void, Void, String> {

        HttpProvider httpProvider = new HttpProvider("https://bicon.net.solidwallet.io/api/v3");
        IconService iconService = new IconService(httpProvider);
        KeyWallet cusWallet = KeyWallet.load(new Bytes("a03694b07ab48f01e8f617e4c2d3953fcae8a0347d17a14a426030ff0de05e41"));

        @Override
        protected String doInBackground(Void... voids) {

            try {

                BigDecimal balanceLoop = BigDecimal.valueOf(iconService.getBalance(cusWallet.getAddress()).execute().doubleValue());
                BigDecimal balanceIcx = balanceLoop.divide(BigDecimal.valueOf(pow(10, 18)));
                Log.i("### balanceIcx", balanceIcx.toString());
                return balanceIcx.toString();

            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }
    }
    /* seungho */


}
