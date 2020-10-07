package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;

public class FirstActivity extends Activity {
    Button tologin, toreg_con, toreg_sel;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.one_first);

        tologin = findViewById(R.id.tologin);
        toreg_con=findViewById(R.id.toreg_con);
        toreg_sel=findViewById(R.id.toreg_sel);

        tologin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (FirstActivity.this,LoginActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

        toreg_con.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(FirstActivity.this, RegCusActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

        toreg_sel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(FirstActivity.this,RegSelActivity.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

    }
}
