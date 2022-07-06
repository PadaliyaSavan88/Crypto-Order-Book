import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/services/token.service';
import { TradeService } from 'src/services/trade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoTrading';
  tokens: Array<any> = [];
  sellTrades: Array<any> = [];
  buyTrades: Array<any> = [];
  history: Array<any> = [];
  sellFormGroup: FormGroup
  buyFormGroup: FormGroup
  tokenForm: FormGroup

  constructor(private _tokenService: TokenService, private _tradeService: TradeService){}

  ngOnInit(){
    this.tokenForm = new FormGroup({
      tokenName: new FormControl(),
      tokenSymbol: new FormControl()
    })

    this.sellFormGroup = new FormGroup({
      token: new FormControl(null),
      quantity: new FormControl(),
      price: new FormControl()
    })

    this.buyFormGroup = new FormGroup({
      token: new FormControl(null),
      quantity: new FormControl(),
      price: new FormControl()
    })
    
    this.getTokens()
    this.getTrades()
    this.getHistory()
  }

  getTokens(){
    this._tokenService.getTokens().subscribe(result => {
      this.tokens = result.tokens
      console.log(this.tokens)
    })
  }

  addToken(){
    this._tokenService.addToken(this.tokenForm.value).subscribe()
  }

  getTrades(){
    this._tradeService.getTrades().subscribe(results => {
      this.sellTrades = results.trades.filter((_x: any) => _x.type === 1)
      this.buyTrades = results.trades.filter((_x: any) => _x.type === 2)
      console.log(this.sellTrades)
      console.log(this.buyTrades)
    })
  }

  getHistory(){
    this._tradeService.getHistory().subscribe(results => {
      this.history = results.history
    })
  }

  addOrder(){
    let json = {
      ...this.buyFormGroup.value,
      type: 2
    }
    this._tradeService.createTrade(json).subscribe()
  }
  
  sellOrder(){
    let json = {
      ...this.sellFormGroup.value,
      type: 1
    }
    this._tradeService.createTrade(json).subscribe()
  }
}
