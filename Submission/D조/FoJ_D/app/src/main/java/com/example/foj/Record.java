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

public class Record extends Activity {
    ImageView btnok;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.record);

        btnok = findViewById(R.id.btnok);
        btnok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Record.this,Wallet.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

    }

    /* seungho */
    public void onBackPressed() {
        Intent intent = new Intent(getApplicationContext(), Wallet.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
