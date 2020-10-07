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

public class Main extends Activity {
    ImageView user,jjgg;
    TextView premium;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        jjgg = findViewById(R.id.jjgg);
        user = findViewById(R.id.user);
        premium = findViewById(R.id.premium);

        premium.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Main.this,Main2.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

        jjgg.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Main.this,ProductDetails.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });
        user.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent (Main.this,Myaccount2.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */
            }
        });

    }
}
