package com.example.foj_project

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import kotlinx.android.synthetic.*
import kotlinx.android.synthetic.main.activity_app2.*
import kotlinx.android.synthetic.main.activity_verify1.*

class app2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_app2);

        Btnask.setOnClickListener(){
            val intent = Intent(this, message2::class.java)
            startActivity(intent)
        }

        btnbuy.setOnClickListener(){
            val intent = Intent(this, buy::class.java)
            startActivity(intent)
        }



    }
}