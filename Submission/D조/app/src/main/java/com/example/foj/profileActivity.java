package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;

public class profileActivity extends Activity {
    Button btnmyprfl, btnvc, btnvp;

    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile);

        btnmyprfl = findViewById(R.id.btnmyprfl);
        btnvc = findViewById(R.id.btnvc);
//        btnvp = findViewById(R.id.btnvp);

        btnmyprfl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (profileActivity.this,profileActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
        btnvc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (profileActivity.this,VcActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
//        btnvp.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent (profileActivity.this,vctoVP.class);
//                startActivity(intent);
//            }
//        });

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
