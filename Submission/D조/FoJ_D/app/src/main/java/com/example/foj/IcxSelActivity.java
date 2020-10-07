package com.example.foj;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import foundation.icon.icx.KeyWallet;
import foundation.icon.icx.data.Bytes;

public class IcxSelActivity extends AppCompatActivity {
//    /*seungho */
//    EditText icxAddress;
//    /* seungho */
    Button done;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.six_icx);

//        /* seungho */
//        icxAddress = findViewById(R.id.username);
//        /* seungho */
        done = findViewById(R.id.done);

//        /* seungho */
//        KeyWallet selWallet = KeyWallet.load(new Bytes(""));
//        icxAddress.setText(selWallet.getAddress().toString());
//        Log.i("### selWallet Address", icxAddress.getText().toString());
//        /* seungho */

        done.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (IcxSelActivity.this, RegDid.class);
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
        Intent intent = new Intent(getApplicationContext(), RegSelActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}