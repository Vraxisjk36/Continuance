#!/usr/bin/env python3
from pathlib import Path
p=Path("android/app/src/main/java/com/continuance/janus/MainActivity.java")
p.parent.mkdir(parents=True,exist_ok=True)
p.write_text("""package com.continuance.janus;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.view.WindowManager;
import android.view.View;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private boolean unlocked = false;
    private void enableImmersive() {
        getWindow().getDecorView().setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |
            View.SYSTEM_UI_FLAG_FULLSCREEN |
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION);
    }
    @Override public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) enableImmersive();
    }
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        enableImmersive();
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
