pragma solidity 0.5.12;

contract Test {
    string private _message;
    
    constructor() public {
        _message = "constructor";
    }
    
    function getter() public view returns (string memory) {
        return _message;
    }
    
    function setter(string memory message) public {
        _message = message;
    }
}
