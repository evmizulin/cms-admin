import React from 'react'
import { PageContainer } from 'src/lib/components/PageContainer'
import { Button } from 'src/lib/components/Button'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import { routes } from 'src/lib/services/Routes'
import { config } from 'src/config'
import { GithubCorner } from 'src/landing/components/GithubCorner'

import { cn } from './Landing.style'

export class Landing extends React.Component {
  render() {
    return (
      <PageContainer>
        <GithubCorner />
        <div className={`${cn.header}`}>
          <div className={`text-right`}>
            <span className="pr-sm">
              <Link to={routes.login()} className="text-no-underline">
                <Button onClick={() => {}} color="primary" size="lg" outlined>
                  Sign in
                </Button>
              </Link>
            </span>
            <Link to={routes.registration()} className="text-no-underline">
              <Button onClick={() => {}} color="primary" size="lg" filled>
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        <div className={cn.body}>
          <div className={cn.messages}>
            {!config.isDemo ? null : (
              <div className={cn.message}>
                Don't want to register? Use test account: login - test, password - testtest.
              </div>
            )}
            <div className={`${cn.message}`}>
              <div className="pb-sm">We need your support.</div>
              <div className="pb-sm">
                Your even small donation will help us make nice product for you.{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://money.yandex.ru/to/410011439375102"
                >
                  Donate!
                </a>
              </div>
            </div>
          </div>
          <div className={`${cn.title} pb-sm`}>
            {/* Headless{' '} */}
            Open source headless{' '}
            <acronym title="Content Management System" lang="en">
              CMS
            </acronym>{' '}
            that could help manage and deliver any{' '}
            <acronym title="JavaScript Object Notation string format" lang="en">
              JSON
            </acronym>{' '}
            to&nbsp;any app
          </div>
          {!config.isDemo ? null : (
            <div className={cn.explanation}>It's the demo server, don't use in production environment</div>
          )}
          <div className={`pt-lg mt-lg`}>
            <YouTube
              videoId="XLUM4URSWjw"
              opts={{
                width: 760,
                height: 432,
                playerVars: {
                  // controls: 0,
                  iv_load_policy: 3,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                },
              }}
            />
          </div>
          <div className="pt-lg mt-lg text-center pb-lg">
            Created by <a href="mailto:evgeny.mizulin@gmail.com">Evgeny Mizulin</a>
          </div>
        </div>
      </PageContainer>
    )
  }
}
