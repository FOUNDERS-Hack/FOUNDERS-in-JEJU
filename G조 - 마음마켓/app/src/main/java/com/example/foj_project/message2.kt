package com.example.foj_project

import android.content.Context
import android.os.Bundle
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_message2.*


class message2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_message2)
        var counter = 0

        fun hideKeyboard() {
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.hideSoftInputFromWindow(edit_simple.windowToken, 0)
        }

        btnsend.setOnClickListener {
            hideKeyboard()
            counter++
            if (counter == 1) {
                chat10.setImageResource(R.drawable.chat6)
            } else if (counter == 2) {
                chat9.setImageResource(R.drawable.chat7)
            } else if (counter == 3) {
                chat7.setImageResource(R.drawable.chat8)
            }

        }
    }

}
