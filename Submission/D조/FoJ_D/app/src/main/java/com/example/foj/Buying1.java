package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;


public class Buying1 extends Activity {
    ImageView btnbuy;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.buying1);

        btnbuy=findViewById(R.id.btnbuy);
        btnbuy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Buying1.this,Payment.class);
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
        Intent intent = new Intent(getApplicationContext(), ProductDetails.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
