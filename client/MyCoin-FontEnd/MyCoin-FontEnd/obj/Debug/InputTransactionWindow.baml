   M S B A M L   `   `   `  ����I  EMyCoin_FontEnd, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:MyCoin_FontEndMyCoin_FontEnd  5   	   +    %MyCoin_FontEnd.InputTransactionWindow   5   	   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   .localclr-namespace:MyCoin_FontEnd     5   	   V RMaterialDesignThemes.Wpf, Version=3.1.3.1513, Culture=neutral, PublicKeyToken=nullFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5	   	     � Title$  InputTransactionWindow��5   	   $	��540��6(   $	��800��65      MaterialDesignBody#���   5
   	   $��Regular"�5   	   $��20(�5   	   &   System.Windows.Media.TextOptions   TextFormattingMode$ Ideal=�5   	      TextRenderingMode$
 Auto=�5   	    � WindowStartupLocation$ CenterOwner=�5   	     MaterialDesignPaper#���  5   	     MaterialDesignFont#���  5   	    
 MainVM � DataContext# [ 5      .��5      ]� .+�5   
   #  MaterialDesignThemes.Wpf.Card  $��40q�6   .��5      � $��32q�6    � RowDefinitions 5      �� 5      $��2* �6$   �� 5      $��2* �6$   �� 5      $��2* �6$   �� 5      $��2* �6$   �� 5      $��2* �6$   �� 5      $��2* �6$   �� 5      $��3* �6$   .+�5"      �� $��0��6   $��Center=�5#      $
��Left=�5$      $��24(�5%      $��Your private key��6&   $
��Bold"�6>   �� 5'      $��1��6   $	��Top=�6'   $��Stretch=�6?    * &MaterialDesignOutlinedTextFieldTextBox#��[ 5(      )  #MaterialDesignThemes.Wpf.HintAssist   Hint$ Your private key��5)      .  (MaterialDesignThemes.Wpf.TextFieldAssist   TextFieldCornerRadius$ 4��5+       �� 
IsReadOnly .  ��5*      �� 	 �� Path$	 TransactionPrivateKey�
 �� ValidatesOnExceptions
 .  �� UpdateSourceTrigger$ PropertyChanged=�5,      �� 5.      $��2��6   $��Center=�5/      $
��Left=�50      $��24(�51      $��
To address��6&   $
��Bold"�68   �� 53      $��3��6   $	��Top=�6'   $��Stretch=�6?   #��[ 54      $ 
To address��55      $ 4��57       .  ��56      �� $	 TransactionToAddress�
 . $ PropertyChanged=�58      �� 5:      $��4��6   $��Center=�5;      $
��Left=�5<      $��24(�5=      $��Amount��6&   $
��Bold"�64   �� 5?      $��5��6   $	��Top=�6'   $��Stretch=�6?   #��[ 5@      $ Amount��5A      $ 4��5C       .  ��5B      �� $	 TransactionAmount�
 . $ PropertyChanged=�5D      �� 5F      $��6��6   $��40��6&   $	��160��62   $
��Left=�6>   +  %MaterialDesignThemes.Wpf.ButtonAssist   CornerRadius$ 4��5G        MaterialDesignRaisedButton#��[ 5H       �� 	IsDefault . ��5J      �� *CreateTransactionCmd+.��5K      � .+�5L      �� $
��Send��6$   $��Center=�60   6O   5M      5N      5O      5P      5Q      5R      