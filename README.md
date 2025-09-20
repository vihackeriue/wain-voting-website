# 🚀 Fullstack  wain-voting-website

Dự án này là một ứng dụng **Voting App** fullstack gồm 3 phần chính:

- **Backend**: API viết bằng [Spring Boot](https://spring.io/projects/spring-boot).
- **Frontend**: Giao diện viết bằng [ReactJS](https://reactjs.org/).
- **Smart Contract**: Quản lý logic bầu chọn bằng [Hardhat](https://hardhat.org/).

---

## 📂 Cấu trúc thư mục

<pre> 
wain-voting-website/
│
├── wain-voting-backend/ # Spring Boot (API, service, database)
│ ├── src/
│ └── pom.xml
│
├── wain-voting-frontend/ # ReactJS (UI)
│ ├── src/
│ └── package.json
│
├── wain-voting-hardhat/ # Hardhat (Smart contracts, deployment)
│ ├── contracts/
│ ├── scripts/
│ ├── test/
│ └── hardhat.config.js
│
└── README.md # Hướng dẫn sử dụng
</pre>

## 🚀 Hướng dẫn cài đặt & chạy project


```bash
git clone (https://github.com/vihackeriue/wain-voting-website.git)
cd wain-voting-website

# Mở Ganache và khởi tạo workspace mới
# Kết nối Ganache với Metamask (xem file hướng dẫn: [kết nối ganache](https://drive.google.com/file/d/1N_ftutVAHPwr9ud7KZEn3KAYJ9-SaL1L/view?usp=sharing))
# Khởi chạy IPFS local (Kubo)
ipfs init
ipfs daemon

### Smart Contract (Hardhat)
cd wain-voting-hardhat
Tạo file .env:
PRIVATE_KEY=your_private_key_from_ganache

npx hardhat compile
npx hardhat run scripts/deploy.js --network ganache

###Frontend (ReactJS)
cd wain-voting-frontend
Copy CONTRACT_ADDRESS và ABI từ Hardhat vào:
src/constants/contract

Sửa link API trong:
src/api/axios.js

Cài đặt & chạy frontend:
npm install
npm run dev

###Backend (Spring Boot)
cd wain-voting-backend

Tạo database MySQL:
CREATE DATABASE wain_voting_database;

Chạy backend

###url:
Backend API:   http://localhost:8080
Frontend React: http://localhost:5173
Ganache RPC:    http://127.0.0.1:7545
IPFS API:       http://127.0.0.1:5001
bash```
## kết quả:
**Link**: [result](https://drive.google.com/file/d/1eiBVP5SNa8DgbizF3B421kbwS5F1xqnI/view?usp=sharing)







