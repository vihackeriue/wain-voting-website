import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const ConnectWalletButton = () => {
    const navigate = useNavigate();

    const handleConnectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("Vui lòng cài MetaMask!");
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            const response = await fetch("http://localhost:8080/api/user/update-wallet", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ walletAddress: address })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Liên kết ví thất bại.");
                return;
            }

            // Nếu server trả về token mới có chứa địa chỉ ví:
            if (result.accessToken) {
                localStorage.setItem("token", result.accessToken);
                window.dispatchEvent(new Event("storage"));
            }

            alert("🎉 Liên kết ví thành công!");
            navigate(0); // reload lại trang để cập nhật token
        } catch (err) {
            console.error("Lỗi liên kết ví:", err);
            alert("Lỗi khi kết nối MetaMask hoặc gửi yêu cầu.");
        }
    };

    return (
        <Button onClick={handleConnectWallet} className="rounded-pill px-4 bg-success border-0 text-white">
            🔗 Liên kết ví
        </Button>
    );
};

export default ConnectWalletButton;
