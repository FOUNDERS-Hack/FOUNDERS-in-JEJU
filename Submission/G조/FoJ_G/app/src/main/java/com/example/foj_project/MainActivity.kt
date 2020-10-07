package com.example.foj_project

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.foj_project.login.EmailLoginActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), View.OnClickListener {

    //firebase Auth
    private lateinit var firebaseAuth: FirebaseAuth
    //google client
    private lateinit var googleSignInClient: GoogleSignInClient

    //private const val TAG = "GoogleActivity"
    private val RC_SIGN_IN = 99

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //btn_googleSignIn.setOnClickListener (this) // 구글 로그인 버튼
        btn_google.setOnClickListener { signIn() }
        btn_email.setOnClickListener{
            val intent = Intent(this, EmailLoginActivity::class.java) // 이메일 로그인 화면으로 이동
            startActivity(intent)
        }

        //Google 로그인 옵션 구성. requestIdToken 및 Email 요청
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        //firebase auth 객체
        firebaseAuth = FirebaseAuth.getInstance()
    }

    // onStart. 유저가 앱에 이미 구글 로그인을 했는지 확인
    public override fun onStart() {
        super.onStart()
        val account = GoogleSignIn.getLastSignedInAccount(this)
        if(account!==null){ // 이미 로그인 되어있을시 바로 Shop1Activity로 이동
            toShop1Activity(firebaseAuth.currentUser)
        }
    } //onStart End

    // onActivityResult
    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                // Google Sign In was successful, authenticate with Firebase
                val account = task.getResult(ApiException::class.java)
                firebaseAuthWithGoogle(account!!)

            } catch (e: ApiException) {
                // Google Sign In failed, update UI appropriately
                Log.w("MainActivity", "Google sign in failed", e)
            }
        }
    } // onActivityResult End

    // firebaseAuthWithGoogle
    private fun firebaseAuthWithGoogle(acct: GoogleSignInAccount) {
        Log.d("MainActivity", "firebaseAuthWithGoogle:" + acct.id!!)

        //Google SignInAccount 객체에서 ID 토큰을 가져와서 Firebase Auth로 교환하고 Firebase에 인증
        val credential = GoogleAuthProvider.getCredential(acct.idToken, null)
        firebaseAuth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    Log.w("MainActivity", "firebaseAuthWithGoogle 성공", task.exception)
                    toShop1Activity(firebaseAuth.currentUser)
                } else {
                    Log.w("MainActivity", "firebaseAuthWithGoogle 실패", task.exception)
                    Snackbar.make(mainlayout, "로그인에 실패하였습니다.", Snackbar.LENGTH_SHORT).show()
                }
            }
    }// firebaseAuthWithGoogle END


    // toShop1Activity
    fun toShop1Activity(user: FirebaseUser?) {
        if(user !=null) { // AuthMainActivity 로 이동
            startActivity(Intent(this, Shop1Activity::class.java))
            finish()
        }
    } // toShop1Activity End

    // signIn
    private fun signIn() {
        val signInIntent = googleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }
    // signIn End

    override fun onClick(p0: View?) {
    }
}