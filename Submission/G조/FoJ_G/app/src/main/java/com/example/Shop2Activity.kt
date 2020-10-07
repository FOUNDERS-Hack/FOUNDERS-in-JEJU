package com.example.foj_project

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth
import kotlinx.android.synthetic.main.activity_shop2.*
import com.google.android.material.appbar.CollapsingToolbarLayout
import kotlinx.android.synthetic.main.content_scrolling1_2.*
import kotlinx.android.synthetic.main.content_scrolling1_2.chgview

class Shop2Activity : AppCompatActivity(){

    //firebase Auth
    private lateinit var firebaseAuth: FirebaseAuth
    //google client
    private lateinit var googleSignInClient: GoogleSignInClient

    val RC_SIGN_IN = 1000


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_shop2)


        chgview.setOnClickListener {
            val intent = Intent(this, Shop1Activity::class.java)
            startActivity(intent)
        }

        Btnbu.setOnClickListener {
            val intent = Intent(this, app2::class.java)
            startActivity(intent)
            finish()
        }


//        하단 네비바
        shop1.setOnClickListener{
            val intent = Intent(this, Shop2Activity::class.java)
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

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        //firebase auth 객체
        firebaseAuth = FirebaseAuth.getInstance()
    }

    override fun onStart() {
        super.onStart()
        Log.d("life_cycle", "onStart")
    }
    override fun onResume() {
        super.onResume()
        Log.d("life_cycle", "onResume")
    }
    override fun onPause() {
        super.onPause()
        Log.d("life_cycle", "onPause")
    }
    override fun onStop() {
        super.onStop()
        Log.d("life_cycle", "onStop")
    }
    override fun onDestroy() {
        super.onDestroy()
        Log.d("life_cycle", "onDestroy")
    }

}
