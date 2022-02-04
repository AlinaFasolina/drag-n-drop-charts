# Todo List

URGENT:
- [ ] Fix the chartgrid
https://codesandbox.io/s/152gz?file=/src/App.js:0-42


MUST HAVE:
- [ ] Add Google Analytics once deployed to production
    https://www.youtube.com/watch?v=xIkXCs1SnpM
- [ ] Add membership w/ Stripe & Auth0 connection
    https://community.auth0.com/t/building-a-membership-site-with-auth0-and-stripe/49115
   https://www.youtube.com/watch?v=CqXjp1vtNwk
- [ ] Add Telegram Alerts?
    

GOOD TO HAVE:

Change when deploying LIVE:
- Change Auth0 to official one -> Modify src/index.js
- Improve TailwindCSS UI with
    - https://tailblocks.cc/
    - https://tailwindui.com/components/application-ui/data-display/description-lists\
- Affiliate Links (Promo codes): If they sign up, they get 10% off, referrer gets 10% from that referral too


# Chart Wiki
C01 - Risk Gauge: Same endpoint as historical risk chart, buy only take the last value
C02 - Historical Risk Levels: Same endpoint, display stockChart, overlay with BTC price? log scale

# Chart Boilerplate Code
chart: {
    backgroundColor: '#1B1E31',
},
title: {
    style: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#20C55E'
    },
},

# Subdomains
main: stacksmartly.com
application: app.stacksmartly.com
api (authentication required): api.stacksmartly.com
tutorial for the above: https://www.youtube.com/watch?v=fWD_ciSWklQ


# Neumorphism UI
Resources:
https://akaspanion.github.io/ui-neumorphism/card


# Problems
- [ ] Tooltip not popping up, overlapped by ChartGrid even though z-level is 99
- [ ] Convert component styling to neumorphism UI
- [ ] Clean up CSS styling 
- [ ] Move the CSS in dashboard.css to index.css instead, use tailwindcss not pure css
- [ ] Highcharts Components styling must change when ThemeIcon is pressed (currently on css is switching)
    - I tried various methods like useContext and useState
    - Im not good at JS so i cant get it to work
    - highchartsforums suggested to destroy charts and update. https://www.highcharts.com/forum/viewtopic.php?t=44170
- [ ] Implement toolbox for grid layout https://react-grid-layout.github.io/react-grid-layout/examples/14-toolbox.html
    - Store at the top right hand corner, so users can click which charts they want
- [ ] Connect highcharts to Glassnode API to show some price data. Will provide more information upon request.
