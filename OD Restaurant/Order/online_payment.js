
new Vue({
    el: "#app",
    data() {
      return {
        currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        cardNumberTemp: "",
        isCardFlipped: false,
        focusElementStyle: null,
        isInputFocused: false
      };
    },
    mounted() {
      this.cardNumberTemp = this.otherCardMask;
      document.getElementById("cardNumber").focus();
    },
    computed: {
      getCardType () {
        let number = this.cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";
  
        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";
  
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";
  
        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";
        
        re = new RegExp('^9792')
        if (number.match(re) != null) return 'troy'
  
        return "visa"; // default type
      },
          generateCardNumberMask () {
              return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
      },
      minCardMonth () {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      }
    },
    watch: {
      cardYear () {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      }
    },
    methods: {
      flipCard (status) {
        this.isCardFlipped = status;
      },
      focusInput (e) {
        this.isInputFocused = true;
        let targetRef = e.target.dataset.ref;
        let target = this.$refs[targetRef];
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
        }
      },
      blurInput() {
        let vm = this;
        setTimeout(() => {
          if (!vm.isInputFocused) {
            vm.focusElementStyle = null;
          }
        }, 300);
        vm.isInputFocused = false;
      }
    }
  });

  // استهداف زر الدفع
const payButton = document.querySelector('.card-form__button');

// إضافة حدث استماع لزر الدفع
payButton.addEventListener('click', function() {
    // عرض علامة التحميل
    const loader = document.createElement('div');
    loader.classList.add('loader');
    payButton.appendChild(loader);
    
    // تأخير لبعض الوقت لعرض علامة التحميل (لأغراض التأثير)
    setTimeout(function() {
        // إزالة علامة التحميل
        loader.remove();
        
        // تغيير نص الزر إلى "Successful Payment"
        payButton.textContent = 'Successful Payment';
        // تغيير لون الزر إلى اللون الأخضر
        payButton.style.backgroundColor = 'green';
        
        // إضافة رسالة تحت الزر
        const message = document.createElement('div');
        message.textContent = 'Payment successful. Your order will be delivered within 45 minutes.';
        message.style.color = 'green';
        payButton.parentNode.appendChild(message);
        
        // تأخير لبعض الوقت لعرض الرسالة (لأغراض التأثير)
        setTimeout(function() {
            // إزالة الرسالة بعد مرور بعض الوقت
            message.remove();
            
            // عودة للصفحة الرئيسية بعد ظهور الرسالة
            window.location.href = '../index.html'; // قم بتغيير اسم الملف بالملف الذي تريد العودة إليه
        }, 3000); // يمكنك تغيير الوقت حسب الحاجة
    }, 2000); // يمكنك تغيير الوقت حسب الحاجة
});
