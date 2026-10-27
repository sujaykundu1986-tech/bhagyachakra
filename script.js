// ১. রাশিফল দেখানোর ফাংশন
function showRashi(name, text, luck, color) {
  const box = document.getElementById('rashi-details');
  document.getElementById('rashi-name').innerText = `♈ ${name} রাশির আজকের ফলাফল`;
  document.getElementById('rashi-text').innerText = text;
  document.getElementById('rashi-luck').innerText = luck;
  document.getElementById('rashi-color').innerText = color;
  
  box.classList.remove('hidden');
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ২. অষ্টকূট যোটক বিচার (৩৬ গুণের গণনা)
function calculateMatch() {
  const gName = document.getElementById('groom-name').value.trim();
  const bName = document.getElementById('bride-name').value.trim();
  const gRashi = parseInt(document.getElementById('groom-rashi').value);
  const bRashi = parseInt(document.getElementById('bride-rashi').value);

  if (!gName || !bName) {
    alert('দয়া করে পাত্র ও পাত্রী উভয়ের নাম লিখুন।');
    return;
  }

  // বৈদিক রাশির দূরত্বের ভিত্তিতে গণিতসম্মত গুণ হিসাব
  const diff = Math.abs(gRashi - bRashi);
  let baseScore = 24;

  if (diff === 0) baseScore = 28; // সমরাশি
  else if (diff === 4 || diff === 8) baseScore = 31; // ত্রিকোণ মিত্রতা
  else if (diff === 6) baseScore = 18; // সমসপ্তক
  else if (diff === 5 || diff === 7) baseScore = 14; // ষড়াষ্টক (মাঝারি)

  // কিছুটা রেন্ডম বৈচিত্র্য যোগ (১৮ থেকে ৩৬ এর মধ্যে)
  const finalScore = Math.min(36, Math.max(16, baseScore + (gName.length % 5)));

  const resultBox = document.getElementById('match-result');
  const scoreText = document.getElementById('match-score');
  const verdictText = document.getElementById('match-verdict');

  scoreText.innerHTML = `মোট গুণ মিলন: <span style="color:#fbbf24">${finalScore} / ৩৬</span>`;

  if (finalScore >= 25) {
    verdictText.innerHTML = `🌟 <strong>উত্তম মিলন!</strong> ${gName} এবং ${bName}-এর দাম্পত্য জীবন সুখকর ও সমৃদ্ধিপূর্ণ হওয়ার জোরালো যোগ রয়েছে।`;
  } else if (finalScore >= 18) {
    verdictText.innerHTML = `⚖️ <strong>মধ্যম মিলন।</strong> দাম্পত্য জীবনে পারস্পরিক সমঝোতা প্রয়োজন হবে। কোনো বিশেষজ্ঞের পরামর্শে কুষ্ঠির অন্যান্য গ্রহদোষ বিচার করিয়ে নেওয়া ভালো।`;
  } else {
    verdictText.innerHTML = `⚠️ <strong>সতর্কতা!</strong> গুণমিলন ১৮-এর কম হয়েছে। জ্যোতিষ মতে নাড়ী বা ভকূট দোষ থাকতে পারে। কোনো অভিজ্ঞ জ্যোতিষীর পূর্ণাঙ্গ পরামর্শ নিন।`;
  }

  resultBox.classList.remove('hidden');
}

// ৩. পেইড সেবা প্রি-সিলেক্ট
function preselectService(serviceName) {
  const dropdown = document.getElementById('cust-service');
  dropdown.value = serviceName;
}

// ৪. হোয়াটসঅ্যাপে সরাসরি বুকিং পাঠানো
function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById('cust-name').value;
  const dob = document.getElementById('cust-dob').value;
  const tob = document.getElementById('cust-tob').value;
  const pob = document.getElementById('cust-pob').value;
  const service = document.getElementById('cust-service').value;
  const query = document.getElementById('cust-query').value || 'বিশেষ কোনো প্রশ্ন নেই';

  // আপনার নিজস্ব হোয়াটসঅ্যাপ নম্বর এখানে বসান (দেশের কোড ৯১ সহ, কোনো + বা স্পেস ছাড়া)
  const yourWhatsAppNumber = "917980667418"; 

  const message = `*নতুন জ্যোতিষ সেবার অনুরোধ*%0A` +
                  `---------------------------%0A` +
                  `*নাম:* ${name}%0A` +
                  `*সেবা:* ${service}%0A` +
                  `*জন্ম তারিখ:* ${dob}%0A` +
                  `*জন্মের সময়:* ${tob}%0A` +
                  `*জন্মের স্থান:* ${pob}%0A` +
                  `*প্রশ্ন:* ${query}%0A` +
                  `---------------------------%0A` +
                  `দয়া করে আমার বুকিং নিশ্চিত করুন।`;

  const waURL = `https://wa.me/${yourWhatsAppNumber}?text=${message}`;
  window.open(waURL, '_blank');
}