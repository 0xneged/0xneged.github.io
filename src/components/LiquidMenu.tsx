import House from 'assets/icons/House'
import Referral from 'assets/icons/Referral'
import Trophy from 'assets/icons/Trophy'
import './LiquidMenu.css'
import RouteCard from './Navigator.tsx/RouteCard'

const routes = [
  {
    href: '/',
    text: 'Main',
    icon: <House />,
  },
  {
    href: '/refs',
    text: 'Referrals',
    icon: <Referral />,
  },
  {
    href: '/leaderboard',
    text: 'Leaderboard',
    icon: <Trophy />,
  },
]

export default function LiquidMenu() {
  return (
    <nav className="fixed bottom-0 w-full max-w-prose">
      <div className="wrapper m-4">
        <div className="liquidGlass-wrapper dock">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
          <div className="liquidGlass-text">
            <div className="dock">
              {routes.map((props) => (
                <RouteCard key={props.text + props.href} {...props} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lighting-color="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </nav>
  )
}
