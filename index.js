<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>الخدمات العامة لوزارة العدل</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{
  --accent:#002408;
}
*{box-sizing:border-box;}
body{
  margin:0;
  font-family:'Cairo',sans-serif;
  background:var(--accent);
  min-height:100vh;
  color:#fff;
}
.container{
  background:rgba(0,0,0,0.4);
  padding:30px;
  border-radius:12px;
  width:90%;
  max-width:600px;
  margin:60px auto;
  text-align:center;
}
h1{margin-bottom:30px;}
input,textarea,select{
  width:100%;
  padding:10px;
  margin:8px 0 15px 0;
  border:none;
  border-radius:8px;
  font-size:16px;
}
button{
  background:var(--accent);
  color:#fff;
  border:none;
  padding:12px 20px;
  border-radius:10px;
  font-size:17px;
  cursor:pointer;
}
button:hover{opacity:0.9;}
.hidden{display:none;}
.buttons button{width:100%;margin-bottom:10px;}
label{display:block;text-align:right;margin-bottom:5px;font-weight:600;}
</style>
</head>
<body>

<div class="container" id="page1">
  <h1>الخدمات العامة لوزارة العدل</h1>
  <label>الاسم الثلاثي:</label>
  <input id="name">
  <label>العمر:</label>
  <input id="age" type="number">
  <button onclick="goToServices()">تسجيل</button>
</div>

<div class="container hidden" id="services">
  <h1>الخدمات</h1>
  <div class="buttons">
    <button onclick="openForm('case')">رفع قضية</button>
    <button onclick="openForm('record')">طلب ازالة سوابق</button>
    <button onclick="openForm('lawyer')">طلب محامي</button>
    <button onclick="openForm('general')">الخدمات العامة والاستفسارات</button>
  </div>
</div>

<!-- رفع قضية -->
<div class="container hidden" id="case">
  <h1>رفع قضية</h1>
  <label>اسم المدعي عليه:</label>
  <input id="caseDefendant">
  <label>سبب القضية:</label>
  <textarea id="caseReason"></textarea>
  <label>قضية عامة أو خاصة:</label>
  <select id="caseType">
    <option value="عامة">عامة</option>
    <option value="خاصة">خاصة</option>
  </select>
  <button onclick="sendCase()">ارسال</button>
</div>

<!-- ازالة سوابق -->
<div class="container hidden" id="record">
  <h1>طلب ازالة سوابق</h1>
  <label>لماذا سجلت عليك سابقة؟</label>
  <textarea id="recordReason"></textarea>
  <label>كم مر على تسجيل السابقة؟</label>
  <input id="recordTime">
  <label style="float:right;font-size:13px;">اضف الدليل هنا</label>
  <input id="recordProof" placeholder="رابط الدليل (صورة أو ملف)">
  <button onclick="sendRecord()">ارسال</button>
</div>

<!-- طلب محامي -->
<div class="container hidden" id="lawyer">
  <h1>طلب محامي</h1>
  <label>لماذا تريد طلب محامي؟</label>
  <textarea id="lawyerWhy"></textarea>
  <label>ماهو سبب القضية؟</label>
  <textarea id="lawyerReason"></textarea>
  <label>قضية عامة أو خاصة؟</label>
  <select id="lawyerType">
    <option value="عامة">عامة</option>
    <option value="خاصة">خاصة</option>
  </select>
  <label>متى موعد القضية؟</label>
  <input id="lawyerDate" type="text" placeholder="اكتب الموعد">
  <button onclick="sendLawyer()">ارسال</button>
</div>

<!-- الخدمات العامة -->
<div class="container hidden" id="general">
  <h1>الخدمات العامة والاستفسارات</h1>
  <button onclick="openForm('namechange')">تغيير الاسم</button>
  <button onclick="openForm('idrequest')">طلب اخراج هوية</button>
</div>

<!-- تغيير الاسم -->
<div class="container hidden" id="namechange">
  <h1>تغيير الاسم</h1>
  <label>الاسم السابق:</label>
  <input id="oldName">
  <label>الاسم الجديد:</label>
  <input id="newName">
  <button onclick="sendNameChange()">ارسال</button>
</div>

<!-- اخراج هوية -->
<div class="container hidden" id="idrequest">
  <h1>طلب اخراج هوية</h1>
  <label>اسمك:</label>
  <input id="idName">
  <label>عمرك:</label>
  <input id="idAge" type="number">
  <label>لماذا تريد اخراج هوية؟</label>
  <textarea id="idReason"></textarea>
  <label>هل تعديت العمر القانوني؟</label>
  <select id="idLegal">
    <option value="نعم">نعم</option>
    <option value="لا">لا</option>
  </select>
  <button onclick="sendID()">ارسال</button>
</div>

<script>
let userName="", userAge="";
const webhook="https://discord.com/api/webhooks/1431439156546109551/oRRrqwfucjxM1ebOQ-7dcwz8ZlsRT5bqH_IEQEORM5cTf8wWafOnriZ41nTMc_zTbWEy";

function goToServices(){
  userName=document.getElementById('name').value.trim();
  userAge=document.getElementById('age').value.trim();
  if(!userName||!userAge){alert("يرجى إدخال الاسم والعمر");return;}
  showPage('services');
}
function openForm(id){showPage(id);}
function showPage(id){
  document.querySelectorAll('.container').forEach(c=>c.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function sendToDiscord(content){
  fetch(webhook,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({content:content})
  });
  alert("تم الإرسال بنجاح ✅");
  showPage('services');
}
// رفع قضية
function sendCase(){
  let def=document.getElementById('caseDefendant').value.trim();
  let reason=document.getElementById('caseReason').value.trim();
  let type=document.getElementById('caseType').value;
  let msg=`الاسم: ${userName}\nالعمر: ${userAge}\nاسم المدعي عليه: ${def}\nسبب القضية: ${reason}\nنوع الطلب: رفع قضية\nنوع القضية: ${type}`;
  sendToDiscord(msg);
}
// ازالة سوابق
function sendRecord(){
  let reason=document.getElementById('recordReason').value.trim();
  let time=document.getElementById('recordTime').value.trim();
  let proof=document.getElementById('recordProof').value.trim();
  let msg=`الاسم: ${userName}\nالعمر: ${userAge}\nنوع الطلب: طلب ازالة سوابق\nلماذا سجلت عليك سابقة: ${reason}\nكم مر على تسجيل السابقة: ${time}\nالدليل: ${proof}`;
  sendToDiscord(msg);
}
// طلب محامي
function sendLawyer(){
  let why=document.getElementById('lawyerWhy').value.trim();
  let reason=document.getElementById('lawyerReason').value.trim();
  let type=document.getElementById('lawyerType').value;
  let date=document.getElementById('lawyerDate').value.trim();
  let msg=`الاسم: ${userName}\nالعمر: ${userAge}\nنوع الطلب: طلب محامي\nلماذا تريد طلب محامي: ${why}\nسبب القضية: ${reason}\nقضية: ${type}\nموعد القضية: ${date}`;
  sendToDiscord(msg);
}
// تغيير الاسم
function sendNameChange(){
  let oldN=document.getElementById('oldName').value.trim();
  let newN=document.getElementById('newName').value.trim();
  let msg=`الاسم: ${userName}\nالعمر: ${userAge}\nنوع الطلب: تغيير الاسم\nالاسم السابق: ${oldN}\nالاسم الجديد: ${newN}`;
  sendToDiscord(msg);
}
// اخراج هوية
function sendID(){
  let n=document.getElementById('idName').value.trim();
  let a=document.getElementById('idAge').value.trim();
  let reason=document.getElementById('idReason').value.trim();
  let legal=document.getElementById('idLegal').value;
  let msg=`الاسم: ${n}\nالعمر: ${a}\nنوع الطلب: طلب اخراج هوية\nالسبب: ${reason}\nتعدى العمر القانوني: ${legal}`;
  sendToDiscord(msg);
}
</script>
</body>
</html>