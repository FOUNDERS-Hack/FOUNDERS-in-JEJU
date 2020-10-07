package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;


public class ProductList2 extends Activity {
    LinearLayout btnhlbc;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.productlist2);

        btnhlbc = findViewById(R.id.btnhlbc);
        btnhlbc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (ProductList2.this,ProductDetails2.class);
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
        Intent intent = new Intent(getApplicationContext(), Myaccount2.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
