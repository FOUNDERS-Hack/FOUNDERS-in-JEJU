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

public class IcxCusActivity extends AppCompatActivity {
    /*seungho */
    EditText icxAddress;
    /* seungho */
    Button done;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.four_icx_cus);

        /* seungho */
        icxAddress = findViewById(R.id.username);
        /* seungho */
        done = findViewById(R.id.done);

        /* seungho */
        KeyWallet cusWallet = KeyWallet.load(new Bytes("a03694b07ab48f01e8f617e4c2d3953fcae8a0347d17a14a426030ff0de05e41"));
        icxAddress.setText(cusWallet.getAddress().toString());
        Log.i("### cusWallet Address", icxAddress.getText().toString());
        /* seungho */

        done.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (IcxCusActivity.this, Main.class);
                startActivity(intent);
            }
        });


    }
}
