// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721, Ownable {
    uint256 private _nextTokenId;

    struct Certificate {
        uint256 id;
        address student;
        string ipfsHash;
        string certHash;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(string => bool) public usedHashes;

    event CertificateMinted(uint256 indexed id, address indexed student, string ipfsHash, string certHash);

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {}

    function mintCertificate(address student, string memory ipfsHash, string memory certHash)
        public
        onlyOwner
        returns (uint256)
    {
        require(!usedHashes[certHash], "Certificate hash already used");

        uint256 tokenId = _nextTokenId++;
        
        usedHashes[certHash] = true;
        
        certificates[tokenId] = Certificate({
            id: tokenId,
            student: student,
            ipfsHash: ipfsHash,
            certHash: certHash
        });

        _safeMint(student, tokenId);

        emit CertificateMinted(tokenId, student, ipfsHash, certHash);

        return tokenId;
    }

    function getCertificate(uint256 id) public view returns (Certificate memory) {
        require(id < _nextTokenId, "Certificate does not exist");
        return certificates[id];
    }
}
