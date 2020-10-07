package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;


public class OrderList extends Activity {
    LinearLayout btnhlb_c;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderlist);

        btnhlb_c = findViewById(R.id.btnhlb_c);
        btnhlb_c.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (OrderList.this,OrderDetails.class);
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
