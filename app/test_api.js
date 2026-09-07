async function test() {
  const res = await fetch('https://all-core-school-erp-backend.onrender.com/api/auth/login', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: 'wrong', password: 'wrong'})
  });
  const text = await res.text();
  console.log("STATUS:", res.status);
  console.log("CONTENT:", text);
}
test();
