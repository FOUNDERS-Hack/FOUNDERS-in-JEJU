package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;


public class Confirm extends Activity {

    Button btnhome;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.confirm);

        btnhome=findViewById(R.id.btnhome);
        btnhome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Confirm.this,Main.class);
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
        Intent intent = new Intent(getApplicationContext(), OrderDetails.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
