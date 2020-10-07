package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;


public class OrderDetails extends Activity {

    ImageView btnbuy2;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderdetails);

        btnbuy2=findViewById(R.id.btnbuy2);
        btnbuy2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(OrderDetails.this,Confirm.class);
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
        Intent intent = new Intent(getApplicationContext(), OrderList.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
