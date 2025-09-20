import { BrowserProvider } from "ethers";
import { contractAbi, contractAddress } from "../constants/contract";
import { Contract } from "ethers";

export const connectMetamask = async () => {
  if (!window.ethereum) {
    alert("Vui lòng cài Metamask");
    return;
  }

  try {
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.error("Kết nối Metamask thất bại:", error);
    return null;
  }
};

export const getBlockchainConnection = async (authWalletAddress) => {
  if (!window.ethereum) {
    alert("Vui lòng cài đặt MetaMask!");
    throw new Error("Vui lòng cài đặt MetaMask!");
  }
  if (!authWalletAddress) {
    alert("Bạn chưa kết nối tài khoản với ví");
    throw new Error("Bạn chưa kết nối tài khoản với ví");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  if (authWalletAddress.toLowerCase() !== userAddress.toLowerCase()) {
    alert("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
    throw new Error("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
  }

  const contract = new Contract(contractAddress, contractAbi, provider);
  return { provider, signer, contract, userAddress };
};

export const getBlockchainSign = async (authWalletAddress) => {
  if (!window.ethereum) {
    throw new Error("Vui lòng cài đặt MetaMask!");
  }
  if (!authWalletAddress) {
    throw new Error("Bạn chưa kết nối tài khoản với ví");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  if (authWalletAddress.toLowerCase() !== userAddress.toLowerCase()) {
    alert("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
    throw new Error("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
  }

  const contract = new Contract(contractAddress, contractAbi, signer);
  return { provider, signer, contract, userAddress };
};
