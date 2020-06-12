import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PrimaryButton from '../../components/PrimaryButton'
import IconZhihu from '../../components/iconfont/IconZhihu'

const DownApp: FC = () => {
    const _open = () => {
        let transfer = document.createElement('input')
        document.body.appendChild(transfer)
        transfer.value = '4d72' // 这里表示想要复制的内容
        transfer.focus()
        transfer.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
        }
        transfer.blur()
        document.body.removeChild(transfer)
        window.open('https://pan.baidu.com/s/1vSBS6EZo7qaLzkqU3MqCnw')
    }

    return (
        <Wrapper>
            <Link to="/">
                <IconZhihu size={100} style={{margin: 'auto'}} />
            </Link>
            <p>有问题，上知乎</p>
            <p style={{marginBottom: 20}}>可信赖的问答社区</p>
            <p style={{marginBottom: 5}}>提取码：4d72</p>
            <PrimaryButton fullWidth onClick={_open} disableElevation={false}>
                前往下载（提取码已复制，直接粘贴即可）
            </PrimaryButton>
            <div className="downBg">
                <img
                    src="https://www.zhihu.com/app/8f6bcb9d6c8ce269599206c90d4594f0.png"
                    alt=""
                />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled('div')`
  padding: 30px;
  p {
    text-align: center;
    font-size: 16px;
  }
  .downBg {
    background-image: linear-gradient(
      hsla(0, 0%, 100%, 0.09) 74%,
      rgba(0, 156, 238, 0.3)
    );
    background-size: cover;
    bottom: 0;
    height: 400px;
    left: 0;
    position: fixed;
    width: 100%;
    display: flex;
    img {
      margin-top: auto;
      width: 80%;
      height: auto;
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  }
`

export default DownApp
