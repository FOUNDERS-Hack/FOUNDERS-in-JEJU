package com.example.foj_project

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_personal.*

class personalActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_personal)

        //        하단 네비바
        shop1.setOnClickListener{
            val intent = Intent(this, Shop1Activity::class.java)
            startActivity(intent)
        }

        payment2.setOnClickListener{
            val intent = Intent(this, Payment2Activity::class.java)
            startActivity(intent)
        }

        sell3.setOnClickListener {
            val intent = Intent(this, Sell_Activity::class.java)
            startActivity(intent)
        }

        mypage4.setOnClickListener{
            val intent = Intent(this, personalActivity::class.java)
            startActivity(intent)
        }

        donation5.setOnClickListener{
            val intent = Intent(this, DonationActivity::class.java)
            startActivity(intent)
        }
    }
}