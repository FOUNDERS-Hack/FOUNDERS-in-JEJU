package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import androidx.annotation.Nullable;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

public class myVP extends Activity {

    /* seungho */
    DatabaseReference mPostReference;
    /* seungho */

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.myvp);

        Intent intent = getIntent();
        String VP = intent.getExtras().getString("VP");
        Log.i("### VP", VP);

        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("VP", VP);

        mPostReference = FirebaseDatabase.getInstance().getReference().child("did:icon:03:0x987654321").child("VP");
        mPostReference.updateChildren(childUpdates);

    }

    /* seungho */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(getApplicationContext(), MyaccountActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
