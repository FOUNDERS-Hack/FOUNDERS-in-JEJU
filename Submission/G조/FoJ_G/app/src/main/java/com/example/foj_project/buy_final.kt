package com.example.foj_project

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_app2.*
import kotlinx.android.synthetic.main.activity_buy_final.*

class buy_final : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_buy_final)

        btnfinish.setOnClickListener() {
            val intent = Intent(this, Shop2Activity::class.java)
            startActivity(intent)
        }
    }
}