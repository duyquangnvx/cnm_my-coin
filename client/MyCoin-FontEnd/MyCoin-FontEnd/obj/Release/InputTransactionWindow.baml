   M S B A M L   `   `   `  ���� I  EMyCoin_FontEnd, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null/clr-namespace:MyCoin_FontEndMyCoin_FontEnd  +    %MyCoin_FontEnd.InputTransactionWindow   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     .localclr-namespace:MyCoin_FontEnd     V RMaterialDesignThemes.Wpf, Version=3.1.3.1513, Culture=neutral, PublicKeyToken=nullFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes    � Title$  InputTransactionWindow��$	��540��$	��800��   MaterialDesignBody#���   $��Regular"�$��20(�&   System.Windows.Media.TextOptions   TextFormattingMode$ Ideal=�   TextRenderingMode$
 Auto=� � WindowStartupLocation$ CenterOwner=�  MaterialDesignPaper#���    MaterialDesignFont#���   
 MainVM � DataContext# [ .��]� .+�#  MaterialDesignThemes.Wpf.Card  $��40q�.��� $��32q� � RowDefinitions �� $��2* ��� $��2* ��� $��2* ��� $��2* ��� $��2* ��� $��2* ��� $��3* �.+��� $��0��$��Center=�$
��Left=�$��24(�$��Your private key��$
��Bold"��� $��1��$	��Top=�$��Stretch=� * &MaterialDesignOutlinedTextFieldTextBox#��[ )  #MaterialDesignThemes.Wpf.HintAssist   Hint$ Your private key��.  (MaterialDesignThemes.Wpf.TextFieldAssist   TextFieldCornerRadius$ 4�� �� 
IsReadOnly .  ���� 	 �� Path$	 TransactionPrivateKey�
 �� ValidatesOnExceptions
 .  �� UpdateSourceTrigger$ PropertyChanged=��� $��2��$��Center=�$
��Left=�$��24(�$��
To address��$
��Bold"��� $��3��$	��Top=�$��Stretch=�#��[ $ 
To address��$ 4�� .  ���� $	 TransactionToAddress�
 . $ PropertyChanged=��� $��4��$��Center=�$
��Left=�$��24(�$��Amount��$
��Bold"��� $��5��$	��Top=�$��Stretch=�#��[ $ Amount��$ 4�� .  ���� $	 TransactionAmount�
 . $ PropertyChanged=��� $��6��$��40��$	��160��$
��Left=�+  %MaterialDesignThemes.Wpf.ButtonAssist   CornerRadius$ 4��  MaterialDesignRaisedButton#��[  �� 	IsDefault . ���� *CreateTransactionCmd+.��� .+��� $
��Send��$��Center=�