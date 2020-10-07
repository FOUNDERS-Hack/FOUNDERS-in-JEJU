package com.example.foj_project

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_buy.*
import kotlinx.android.synthetic.main.activity_buy_final.*

class buy : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_buy)

        btnb.setOnClickListener() {
            val intent = Intent(this, buy_final::class.java)
            startActivity(intent)
        }
    }
}