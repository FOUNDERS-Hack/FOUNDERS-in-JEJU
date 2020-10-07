package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;


public class Payment extends Activity {
    Button btnhome,btnordrlist;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.payment);

        btnhome=findViewById(R.id.btnhome);
        btnordrlist = findViewById(R.id.btnordrlist);

        btnhome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Payment.this,Main.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

        btnordrlist.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Payment.this,OrderList.class);
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
}
