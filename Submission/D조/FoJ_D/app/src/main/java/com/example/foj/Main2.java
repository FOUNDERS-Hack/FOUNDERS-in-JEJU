package com.example.foj;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class Main2 extends Activity {
    ImageView user;
    TextView btnmain;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main2);

        user = findViewById(R.id.user);
        btnmain = findViewById(R.id.btnmain);

        btnmain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Main2.this,Main.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

        user.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (Main2.this,Myaccount2.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

    }
}




