 /* Soft Neon Particle Background */
        const bg=document.getElementById('bgCanvas'),g=bg.getContext('2d');
        let parts=[];
        function resize(){bg.width=innerWidth;bg.height=innerHeight;}
        resize();
        addEventListener('resize',resize);
        function makeParticles(){
        parts=[];
        const count=Math.max(30,Math.floor((bg.width*bg.height)/90000));
        for(let i=0;i<count;i++){
            parts.push({
            x:Math.random()*bg.width,
            y:Math.random()*bg.height,
            r:Math.random()*2+0.8,
            sx:(Math.random()-0.5)*0.3,
            sy:(Math.random()*0.6)+0.1,
            hue:350+Math.random()*30
            });
        }
        }
        makeParticles();
        function drawBg(){
        g.clearRect(0,0,bg.width,bg.height);
        parts.forEach(p=>{
            const grd=g.createRadialGradient(p.x,p.y,p.r*0.2,p.x,p.y,p.r*12);
            grd.addColorStop(0,`hsla(${p.hue},100%,65%,0.12)`);
            grd.addColorStop(1,`hsla(${p.hue},100%,55%,0)`);
            g.fillStyle=grd;
            g.fillRect(p.x-p.r*12,p.y-p.r*12,p.r*24,p.r*24);
            p.x+=p.sx;p.y+=p.sy;
            if(p.x>bg.width+50)p.x=-50;if(p.y>bg.height+50)p.y=-50;if(p.x<-50)p.x=bg.width+50;
        });
        requestAnimationFrame(drawBg);
        }
        drawBg();

        /* Countdown Logic */
        const launchDate = new Date("2025-10-24T00:00:00").getTime(); // Adjust launch date
        const dEl=document.getElementById('days'),
            hEl=document.getElementById('hours'),
            mEl=document.getElementById('minutes'),
            sEl=document.getElementById('seconds'),
            sub=document.getElementById('subtitle');

        function updateCountdown(){
        const now = new Date().getTime();
        const gap = launchDate - now;

        if(gap <= 0){
            sub.textContent = "🚀 We're Live! Redirecting...";
            dEl.textContent=hEl.textContent=mEl.textContent=sEl.textContent='00';
            setTimeout(()=>{ window.location.href='index.html'; }, 4000);
            return;
        }

        const d = Math.floor(gap / (1000 * 60 * 60 * 24));
        const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((gap % (1000 * 60)) / 1000);

        dEl.textContent = d.toString().padStart(2,'0');
        hEl.textContent = h.toString().padStart(2,'0');
        mEl.textContent = m.toString().padStart(2,'0');
        sEl.textContent = s.toString().padStart(2,'0');
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();

        /* Notify Me Submission */
        document.getElementById('notifyForm').addEventListener('submit',e=>{
        e.preventDefault();
        const email=document.getElementById('emailInput').value.trim();
        if(!email){alert('Please enter a valid email');return;}
        alert(`✅ Thanks ${email}! You'll be notified when we launch.`);
        document.getElementById('emailInput').value='';
        });

        /* Calendar Reminders */
        document.getElementById('appleRemind').addEventListener('click',()=>{
        const ics=`BEGIN:VCALENDAR
        VERSION:2.0
        BEGIN:VEVENT
        SUMMARY:Hacktivist Haven Launch
        DESCRIPTION:Hacktivist Haven website is now live! Visit us at hactivisthaven.com
        DTSTART:20251231T000000Z
        DTEND:20251231T010000Z
        END:VEVENT
        END:VCALENDAR`;
        const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});
        const link=document.createElement('a');
        link.href=URL.createObjectURL(blob);
        link.download='hacktivist-haven-launch.ics';
        link.click();
        });

        document.getElementById('googleRemind').addEventListener('click',()=>{
        const url='https://www.google.com/calendar/render?action=TEMPLATE&text=Hacktivist%20Haven%20Launch&dates=20251231T000000Z/20251231T010000Z&details=Hacktivist%20Haven%20is%20live!&location=https://hactivisthaven.com';
        window.open(url,'_blank');
        });