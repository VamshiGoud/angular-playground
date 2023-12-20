import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { PriceTier, TierBasedDiscount } from './tier-based.interface';

@Component({
  selector: 'cp-tier-based',
  templateUrl: './tier-based.component.html',
  styleUrls: ['./tier-based.component.scss']
})
export class TierBasedComponent implements OnInit {

  fb:FormBuilder = new FormBuilder();

  //test data 
  testData = { "supplier": "CMPC", "supplier_mills": [ { "supplier_mill": "Guaiba", "origin_port": "Rio Grande", "origin_cntry": "Brazil", "fiber_type": "BEK", "environmental_certification": "FSC Controlled Wood", "bale_packaging": "Wrapped", "bale_type": "Standard", "is_supplier_mill_domestic": false, "bid_qty_detail": { "bid_type": "Mill Specific", "bid_vol": 3000, "bid_vol_variance_pct": 10, "qty_uom": "ADMT", "period_start": "01/01/2026", "period_end": "12/11/2026", "mill_spec_bid": [ { "mill": "Muskogee", "bid_vol": 1000 }, { "mill": "Rincon", "bid_vol": 2000 } ] }, "freight_detail": { "port_entry_details": [ { "port_entry": "Port of Arthur", "incoterms": [ { "incoterm": "CIF", "stevedoring_cost": 1, "handling_cost": 0, "wharfage_cost": 0, "security_cost": 0, "warehouse_cost_per_month": 0, "customs_fee": 0 } ], "cost_uom": "USD/ADMT", "port_free_time_in_days": 20, "transit_leadtime_in_days_origin_port_port_entry": 1, "steamship_line": "G2 Ocean", "ocean_freight": 20, "safety_stock_nominated_in_days": 20, "safety_stock_location": { "type": "Port of Entry", "name": "Port of Arthur", "location": { "addr_line1": "", "addr_line2": "", "city": "", "state": "", "country": "", "pin_code": "" } }, "transit_cost_from_port_entry_to_safety_stock_loc": 23, "gp_mill": "Muskogee", "handled_by": "supplier" }, { "port_entry": "Port of Beaumont", "incoterms": [ { "incoterm": "CIP", "stevedoring_cost": 1, "handling_cost": 0, "wharfage_cost": 0, "security_cost": 0, "warehouse_cost_per_month": 0, "customs_fee": 0 } ], "cost_uom": "USD/ADMT", "port_free_time_in_days": 20, "transit_leadtime_in_days_origin_port_port_entry": 1, "steamship_line": "G2 Ocean", "ocean_freight": 20, "safety_stock_nominated_in_days": 20, "safety_stock_location": { "type": "Port of Entry", "name": "Port of Beaumont", "location": { "addr_line1": "", "addr_line2": "", "city": "", "state": "", "country": "", "pin_code": "" } }, "transit_cost_from_port_entry_to_safety_stock_loc": 23, "gp_mill": "Rincon", "handled_by": "supplier" } ], "inland_freight": [ { "gp_mill": "Muskogee", "source_type": "Port of Entry", "source_name": "Port of Arthur", "inland_trans_route": "CN Direct", "dest_type": "GP Mill", "dest_name": "Muskogee", "dest_location": { "addr_line1": "", "addr_line2": "", "city": "", "state": "", "country": "", "pin_code": "" }, "transit_mode": "Truck", "transit_cost": 12, "cost_uom": "USD/ADMT", "transit_leadtime_in_days_port_entry_gp_mill": 1, "port_entry": "Port of Arthur" }, { "gp_mill": "Rincon", "source_type": "Port of Entry", "source_name": "Port of Beaumont", "inland_trans_route": "CN Direct", "dest_type": "GP Mill", "dest_name": "Rincon", "dest_location": { "addr_line1": "", "addr_line2": "", "city": "", "state": "", "country": "", "pin_code": "" }, "transit_mode": "Rail", "transit_cost": 12, "cost_uom": "USD/ADMT", "transit_leadtime_in_days_port_entry_gp_mill": 1, "port_entry": "Port of Beaumont" } ], "comments": "" }, "pricing_detail": { "mechanism_basis": "Index", "is_movement_based": true, "initial_price": 315, "time_window": 0, "time_window_period": "", "volume_based_period": "", "additional_discount": 0, "discount_uom": "USD/ADMT", "price_uom": "USD/ADMT", "period_detail": [ { "period_num": 1, "period": "2026", "period_type": "Full Year", "fixed_price_details": { "fixed_price_value": 0, "weightage_pct": 0 }, "index_details": [ { "index": "TTO NA HW Spot", "read_type": "Weekday of month", "read_date": "", "read_day": "", "read_week_criteria": "", "discount_pct": 0, "additional_adjustment": 23, "weightage_pct": 100 } ] } ], "pricing_alternate_mechanism": "", "discounts_allowances": { "price_tier_discounts": { "is_tier_based_discount": false, "tier_uom": "", "price_tiers": [], "comments": "" }, "volume_tier_discounts": { "is_volume_based_discount": false, "tier_uom": "", "volume_tiers": [], "comments": "" }, "alternate_rebate_criteria": "", "port_rebates": { "ports": [ { "port": "Port of Arthur", "discount_val": null }, { "port": "Port of Beaumont", "discount_val": null } ], "discount_uom": "USD/ADMT", "comments": "" } }, "payment_term": "Net 50", "price_ceil": null, "price_floor": null, "ceil_floor_uom": "USD/ADMT", "ceil_floor_period_start": null, "ceil_floor_period_end": null, "comments": "", "movement_change_type": "Percentage", "monthly_negotiation": true } } ] }

  tiers:TierBasedDiscount = {
    "is_tier_based_discount": true,
    "tier_uom": "USD",
    "price_tiers": [
      {
        "tier_label": "Tier-1",
        "tier_low": 100,
        "tier_high": 200,
        "discount_type": "Value",
        "discount_val": 35,
        "discount_pct": null
      },
      {
        "tier_label": "Tier-2",
        "tier_low": 201,
        "tier_high": 300,
        "discount_type": "Percent",
        "discount_val": null,
        "discount_pct": 3.5
      }
    ],
    "comments": ""
  }
  form2: AbstractControl = new FormGroup({});
  tierBasedForm: any = new FormGroup({});
  
  ngOnInit(): void {
    this.initForm();
    this.form2 = this.createFormFromJson(this.fb,this.testData);
  }

  createFormFromJson(fb: FormBuilder, data: any): AbstractControl {
    if (Array.isArray(data)) {
      // If data is an array, create a FormArray
      const formArray = fb.array(data.map(item => this.createFormFromJson(fb, item)));
      return formArray;
    } else if (typeof data === 'object' && data !== null) {
      // If data is an object, create a FormGroup
      const formGroup = fb.group({});
      Object.keys(data).forEach(key => {
        formGroup.addControl(key, this.createFormFromJson(fb, data[key]));
      });
      return formGroup;
    } else {
      // If data is a primitive, create a FormControl
      return fb.control(data);
    }
  }
  
  initForm() {
    // this.tierBasedForm = this.fb.group({
    //   is_tier_based_discount: [this.tiers.is_tier_based_discount],
    //   tier_uom: [this.tiers.tier_uom],
    //   price_tiers: this.fb.array([]),
    // });
    this.tierBasedForm = this.createFormFromJson(this.fb,this.tiers);
    this.tierBasedForm.setControl('price_tiers', this.setPriceTiers(this.tiers.price_tiers));
    this.tierBasedForm.get('price_tiers')?.setValidators(this.overlappingRangeValidator);
    this.tierBasedForm.get('price_tiers')?.updateValueAndValidity();
  }

  setPriceTiers(price_tiers: PriceTier[]): FormArray {
    let control = new FormArray<FormGroup>([]);
    price_tiers.forEach((tier, tierIndex) => {
      let tierGroup: FormGroup = this.fb.group({
        tier_label: [tier.tier_label],
        tier_low: [tier.tier_low, [Validators.required, Validators.min(0)]],
        tier_high: [tier.tier_high, price_tiers.length - 1 === tierIndex ? null : [Validators.required]],
        discount_type: [tier.discount_type, [Validators.required]],
        discount_val: [tier.discount_val],
        discount_pct: [tier.discount_pct]
      }, { validators: this.tierRangeValidator });
      tierGroup.get('discount_val')?.setValidators(tierGroup.get('discount_type')?.value === 'Value' ? [Validators.required] : null);
      tierGroup.get('discount_val')?.updateValueAndValidity();
      tierGroup.get('discount_pct')?.setValidators(tierGroup.get('discount_type')?.value === 'Percent' ? [Validators.required] : null);
      tierGroup.get('discount_pct')?.updateValueAndValidity();
      control.push(tierGroup);
    });
    return control;
  }
  

  //function to add tier to the formArray
  addTier() {
    this.setValidatorsForLastTier();
    const newTier = this.fb.group({
      tier_label: ['Tier-' + ((this.tierBasedForm.get('price_tiers') as FormArray).length + 1)],
      tier_low: [null, [Validators.required, Validators.min(0)]],
      tier_high: [null],
      discount_type: ['',[Validators.required]],
      //discount_val is required when discount_type is Value
      discount_val: [null],
      discount_pct: [null]
    }, { validators: this.tierRangeValidator });
    (this.tierBasedForm.get('price_tiers') as FormArray).push(newTier);
    const priceTierArray = this.tierBasedForm.get('price_tiers') as FormArray;
    priceTierArray.setValidators(this.overlappingRangeValidator);
    priceTierArray.updateValueAndValidity();
  }  

  //function to setValidators for tier_high when new tier is added for the last tier
  setValidatorsForLastTier() {
    const tiers = this.tierBasedForm.get('price_tiers') as FormArray;
    const lastTier = tiers.at(tiers.length - 1);
    lastTier.get('tier_high')?.setValidators([Validators.required]);
    lastTier.get('tier_high')?.updateValueAndValidity();
  }

  tierBasedControls() {
    return (this.tierBasedForm.get('price_tiers') as FormArray).controls;
  }  

  //custom validator to validate if min is less than max
  tierRangeValidator(group: FormGroup): ValidationErrors | null {
    const low = group.get('tier_low')?.value;
    const high = group.get('tier_high')?.value;
  
    if (low !== null && high !== null && low >= high) {
      return { 'tierRangeInvalid': true };
    }
    return null;
  }

  validateForm() {
    this.tierBasedForm.markAllAsTouched();
    if (this.tierBasedForm.valid) {
      window.alert('valid');
    } else {
      window.alert('invalid');
      //show all errors
      this.tierBasedForm.markAllAsTouched();
      //print all errors    
    }
  }

  //validating form of overlapping ranges and skip validation for the last tier
  overlappingRangeValidator(control: AbstractControl): ValidationErrors | null {
    const array = control as FormArray;
    for (let i = 0; i < array.length - 1; i++) {
      const currentTier = array.at(i).value;
      const nextTier = array.at(i + 1).value;
  
      if (currentTier.tier_high && nextTier.tier_low <= currentTier.tier_high) {
        return { overlappingRanges: true };
      }
    }
    return null;
  }
  
  //when dicount type changes, set validators for discount_val and discount_pct
  onDiscountTypeChange(tier:AbstractControl) {
    tier.get('discount_val')?.setValue(null);
    tier.get('discount_pct')?.setValue(null);
    tier.get('discount_val')?.setValidators(tier.get('discount_type')?.value === 'Value' ? [Validators.required] : null);
    tier.get('discount_val')?.updateValueAndValidity();
    tier.get('discount_pct')?.setValidators(tier.get('discount_type')?.value === 'Percent' ? [Validators.required] : null);
    tier.get('discount_pct')?.updateValueAndValidity();
  }

  deleteTier(index: number) {
    const tiers = this.tierBasedForm.get('price_tiers') as FormArray;
    tiers.removeAt(index);
    if (tiers.length > 0) {
      tiers.at(tiers.length - 1).get('tier_high')?.setValidators(null);
      tiers.at(tiers.length - 1).get('tier_high')?.updateValueAndValidity();
    }
    tiers.setValidators(this.overlappingRangeValidator);
    tiers.updateValueAndValidity();
  }
  
}

