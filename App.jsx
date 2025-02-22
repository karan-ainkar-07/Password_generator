import { useState,useEffect, useCallback,useRef} from 'react';
function App() {
  const [length, setLength] = useState(8);
  const [include_no,toggle_include_no]=useState(false);
  const [include_special_char,toggle_special_char]=useState(false);
  let Password_text=useRef(null);

  const generatePass=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(include_no)
        str+='1234567890';
    if(include_special_char)
        str+='!@#$%^&*_';
    for(let i=1;i<=length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    return pass;
  },[length,include_no,include_special_char]) 

  const [pass,set_pass]=useState();

  const copy_to_clip=useCallback(()=>
    {
      Password_text.current?.select();      
      window.navigator.clipboard.writeText(pass);
    },[pass])

  useEffect(()=>{
    set_pass(generatePass());
  },[length,include_no,include_special_char])

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: ' rgba(0, 0, 0, 0.651)',
    fontFamily: 'Arial, sans-serif',
    color:'white'
  };

  const inputStyle = {
    padding: '12px',
    margin: '15px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '250px',
    fontSize: '18px',
  };

  const buttonStyle = {
    padding: '12px 25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '22px',
    marginBottom: '20px',
  };

  const rangeContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const rangeStyle = {
    width: '250px',
    margin: '15px 0',
  };

  const labelStyle = {
    fontSize: '28px',
    color: 'white',
    marginBottom: '20px',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '15px',
  };

  const checkboxStyle = {
    margin: '8px 4px',
    fontSize:'30px'
  };

  const checkboxLabelStyle = {
    fontSize: '20px',
    marginLeft: '10px',
    color: 'white',
  };

  return (
    <>
      <div style={containerStyle}>
        <input style={inputStyle} ref={Password_text} value={pass} readOnly/>
        <button onClick={copy_to_clip} style={buttonStyle}>Copy</button>
        <div style={rangeContainerStyle}>
          <input
            type="range"
            style={rangeStyle}
            min="8"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <p style={labelStyle}>Length: {length}</p>
          <div style={checkboxContainerStyle}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" onChange={() => {
                toggle_include_no(prevState => !prevState);  
                }} style={checkboxStyle} />
                  Numbers
            </label>
            <label style={checkboxLabelStyle}>
            <input type="checkbox" onChange={() => {
                toggle_special_char(prevState => !prevState); 
                }}
                  style={checkboxStyle}
                  />Alpha
            </label> 
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
