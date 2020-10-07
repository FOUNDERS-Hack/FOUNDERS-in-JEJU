package com.example.foj_project

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_app2.*
import kotlinx.android.synthetic.main.activity_verify1.*

class verify1 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_verify1)

        agree.setOnClickListener(){
            val intent = Intent(this, Payment2Activity::class.java)
            startActivity(intent)
        }
        disagree.setOnClickListener(){
            val intent = Intent(this, Payment2Activity::class.java)
            startActivity(intent)
        }

    }
}