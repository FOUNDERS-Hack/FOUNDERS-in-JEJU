package com.example.foj;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class RegSelActivity extends AppCompatActivity {
    Button register;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.three_reg);

        register = findViewById(R.id.register);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (RegSelActivity.this, IcxSelActivity.class);
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
        Intent intent = new Intent(getApplicationContext(), FirstActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}