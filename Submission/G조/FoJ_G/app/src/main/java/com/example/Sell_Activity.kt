package com.example.foj_project
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_sell_.*

class Sell_Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sell_)

        buttontohome.setOnClickListener {
            val intent = Intent(this, Shop1Activity::class.java)
            startActivity(intent)
            finish()
        }
    }
}