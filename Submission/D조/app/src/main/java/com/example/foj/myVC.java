package com.example.foj;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

public class myVC extends Activity {

    /* seungho */
//    EditText etVC;
    Button btnsave;

    DatabaseReference mPostReference;
    /* seungho */


    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.myvc);

        /* seungho */
        Intent intent = getIntent();
        String nameVC = intent.getExtras().getString("nameVC");
        String addressVC = intent.getExtras().getString("addressVC");
        String licenceVC = intent.getExtras().getString("licenceVC");
        String reportVC = intent.getExtras().getString("reportVC");
        String emailVC = intent.getExtras().getString("emailVC");
//        String icxAddressVC = intent.getExtras().getString("icxAddressVC");

        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("nameVC", nameVC);
        childUpdates.put("addressVC", addressVC);
        childUpdates.put("licenceVC", licenceVC);
        childUpdates.put("reportVC", reportVC);
        childUpdates.put("emailVC", emailVC);
//        childUpdates.put("icxAddressVC", icxAddressVC);

//        etVC = findViewById(R.id.username);
//        etVC.setText(VC);

        btnsave = findViewById(R.id.btnsave);
        btnsave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Toast.makeText(getApplicationContext(), "성공적으로 저장되었습니다.", Toast.LENGTH_SHORT).show();

                mPostReference = FirebaseDatabase.getInstance().getReference().child("did:icon:03:0x987654321").child("VC");
                mPostReference.updateChildren(childUpdates);

                Intent intent = new Intent(myVC.this,Myaccount2.class);
                startActivity(intent);
                /* seungho */
                finish();
                /* seungho */

            }
        });

        /* seungho */

    }

    /* seungho */
    @Override
    public void onBackPressed() {
        Intent intent = new Intent(getApplicationContext(), VcActivity.class);
        startActivity(intent);
        super.onBackPressed();
    }
    /* seungho */
}
