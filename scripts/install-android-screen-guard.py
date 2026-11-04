#!/usr/bin/env python3
from pathlib import Path
p=Path("android/app/src/main/java/com/continuance/janus/MainActivity.java")
p.parent.mkdir(parents=True,exist_ok=True)
p.write_text("""package com.continuance.janus;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private boolean unlocked = false;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        getBridge().getWebView().addJavascriptInterface(new Object() {
            @JavascriptInterface public void setSecure(boolean secure) {
                runOnUiThread(() -> {
                    // JS can only unlock once the completion state is reached.
                    // This is a casual spoiler deterrent, not tamper-proof DRM.
                    if (!secure) unlocked = true;
                    if (secure && !unlocked) getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                    else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
                });
            }
        }, "AndroidScreenGuard");
    }
}
""")
print("Installed native Android FLAG_SECURE screen guard")
