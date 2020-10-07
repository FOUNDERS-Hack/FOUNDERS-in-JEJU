package com.example.foj_project

import android.content.Intent
import android.os.Bundle
import com.google.android.material.appbar.CollapsingToolbarLayout
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_payment2.*
import kotlinx.android.synthetic.main.content_scrolling2.*

class Payment2Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment2)

        sweet.setOnClickListener {
            val intent = Intent(this, verify1::class.java)
            startActivity(intent)
        }
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